import { useQuery } from "@tanstack/react-query";
import { fetchWeatherApi } from "openmeteo";

import OneDayWeather from "./OneDayWeather";

export default function WeatherWidget() {
  const {
    data: weatherResponses,
    isPending,
    error,
  } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const weather = await fetchWeatherApi(
        "https://api.open-meteo.com/v1/forecast",
        {
          latitude: 50.05,
          longitude: 19.79,
          daily: [
            "apparent_temperature_max",
            "rain_sum",
            "showers_sum",
            "snowfall_sum",
          ],
          timezone: "Europe/Warsaw",
          forecast_days: 14,
        }
      );
      return weather;
    },
    refetchInterval: 1000 * 60 * 15,
  });

  if (isPending) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>Błąd: {error.message}</p>;
  }

  const weatherResponse = weatherResponses[0];
  const dailyWeather = weatherResponse.daily()!;

  const utcOffsetSeconds = weatherResponse.utcOffsetSeconds()!;
  const dailyWeatherStartTimestamp = Number(dailyWeather.time()!);
  const dailyWeatherInterval = dailyWeather.interval()!;

  const dailyDates = Array(8)
    .fill(0)
    .map(
      (_, index) =>
        new Date(
          (dailyWeatherStartTimestamp +
            dailyWeatherInterval * index +
            utcOffsetSeconds) *
            1000
        )
    );
  const dailyMaxApparentTemperature = Array.from(
    dailyWeather.variables(0)!.valuesArray()!
  );
  const dailyRainSum = Array.from(dailyWeather.variables(1)!.valuesArray()!);
  const dailyShowersSum = Array.from(dailyWeather.variables(2)!.valuesArray()!);
  const dailySnowfallSum = Array.from(
    dailyWeather.variables(3)!.valuesArray()!
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "min(100%, 24em)",
      }}
    >
      {dailyDates.map((value, index) => (
        <OneDayWeather
          key={index}
          date={value}
          maxApparentTemperature={dailyMaxApparentTemperature[index]}
          rainSumMilimeters={dailyRainSum[index] + dailyShowersSum[index]}
          snowSumCentimeters={dailySnowfallSum[index]}
        />
      ))}
    </div>
  );
}
