import { useQuery } from "@tanstack/react-query";
import { fetchWeatherApi } from "openmeteo";

import { HourlyWeather } from "./weather";
import WeatherCode from "./weatherCode";

export default function useWeather(): {
  hourlyWeather: HourlyWeather[] | undefined;
  isPending: boolean;
  error: Error | null;
} {
  const { data, isPending, error } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const weather = await fetchWeatherApi(
        "https://api.open-meteo.com/v1/forecast",
        {
          latitude: 50.05,
          longitude: 19.79,
          hourly: [
            "apparent_temperature",
            "precipitation_probability",
            "rain",
            "showers",
            "snowfall",
            "weather_code",
            "cloud_cover",
          ],
          timezone: "Europe/Warsaw",
          forecast_days: 14,
        }
      );
      return weather;
    },
    refetchInterval: 1000 * 60 * 15,
  });

  if (isPending || error) {
    return { hourlyWeather: undefined, isPending, error };
  }

  const hourlyData = data[0].hourly()!;

  const utcOffsetSeconds = data[0].utcOffsetSeconds()!;
  const startTimestamp = Number(hourlyData.time()!);
  const interval = hourlyData.interval()!;

  const numDataPoints = hourlyData.variables(0)!.valuesArray()!.length;

  const endHours = Array.from({ length: numDataPoints }).map(
    (_, index) =>
      new Date((startTimestamp + interval * index + utcOffsetSeconds) * 1000)
  );
  const apparentTemperatures = Array.from(
    hourlyData.variables(0)!.valuesArray()!
  );
  const precipitationProbabilities = Array.from(
    hourlyData.variables(1)!.valuesArray()!
  );
  const rains = Array.from(hourlyData.variables(2)!.valuesArray()!);
  const showers = Array.from(hourlyData.variables(3)!.valuesArray()!);
  const snowfalls = Array.from(hourlyData.variables(4)!.valuesArray()!);
  const numericCodes = Array.from(hourlyData.variables(5)!.valuesArray()!);
  const cloudCovers = Array.from(hourlyData.variables(6)!.valuesArray()!);

  const hourlyWeather = Array.from({ length: numDataPoints }).map(
    (_, index) =>
      new HourlyWeather(
        endHours[index],
        apparentTemperatures[index],
        precipitationProbabilities[index],
        rains[index],
        showers[index],
        snowfalls[index],
        new WeatherCode(numericCodes[index]),
        cloudCovers[index]
      )
  );

  return { hourlyWeather, isPending, error };
}
