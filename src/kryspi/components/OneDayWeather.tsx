import { formatDate } from "@utils/formatTime";
import useNow from "@utils/useNow";
import useWeather from "@utils/useWeather";
import { HourlyWeather } from "@utils/weather";

import "./OneDayWeather.css";

export default function OneDayWeather({
  daysFromToday,
}: {
  daysFromToday: number;
}) {
  const now = useNow();
  const date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * daysFromToday);
  date.setHours(0, 0, 0, 0);

  const { hourlyWeather, isPending, error } = useWeather();

  const dayName =
    daysFromToday === 0
      ? "Dziś"
      : daysFromToday === 1
      ? "Jutro"
      : daysFromToday === 2
      ? "Pojutrze"
      : formatDate(date);

  if (isPending || hourlyWeather === undefined) {
    return (
      <div className="one-day-weather">
        <p>{dayName}</p>
        <div style={{ flexGrow: 1 }} />
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="one-day-weather">
        <p>{dayName}</p>
        <div style={{ flexGrow: 1 }} />
        <p>Błąd: {error.message}</p>
      </div>
    );
  }

  const lowercaseName = getJointWeatherName(hourlyWeather, date);
  const capitalizedName =
    lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);

  const maxApparentTemperature = getMaxApparentTemperature(hourlyWeather, date);

  return (
    <div className="one-day-weather">
      <p>{dayName}</p>
      <div style={{ flexGrow: 1 }} />
      <p>
        {capitalizedName} &middot; {maxApparentTemperature.toFixed(0)}°C
      </p>
    </div>
  );
}

function getMaxApparentTemperature(
  hourlyWeather: HourlyWeather[],
  date: Date
): number {
  return HourlyWeather.inRange(
    hourlyWeather,
    date,
    new Date(date.getTime() + 1000 * 60 * 60 * 24)
  )
    .map((hourlyWeather) => hourlyWeather.weather.apparentTemperature)
    .reduce((max, current) => Math.max(max, current), 0);
}

function getJointWeatherName(
  hourlyWeather: HourlyWeather[],
  date: Date
): string {
  const morningStart = new Date(date);
  morningStart.setHours(6, 0, 0, 0);

  const afternoonStart = new Date(date);
  afternoonStart.setHours(12, 0, 0, 0);

  const eveningStart = new Date(date);
  eveningStart.setHours(18, 0, 0, 0);

  const nextDayStart = new Date(date.getTime() + 1000 * 60 * 60 * 24);

  const worstMorning = HourlyWeather.worst(
    HourlyWeather.inRange(hourlyWeather, morningStart, afternoonStart)
  );
  const worstAfternoon = HourlyWeather.worst(
    HourlyWeather.inRange(hourlyWeather, afternoonStart, eveningStart)
  );
  const worstEvening = HourlyWeather.worst(
    HourlyWeather.inRange(hourlyWeather, eveningStart, nextDayStart)
  );

  const uniqueNames = new Set([
    worstMorning.weather.name,
    worstAfternoon.weather.name,
    worstEvening.weather.name,
  ]);

  if (uniqueNames.size === 1) {
    return worstMorning.weather.name;
  }

  if (uniqueNames.size === 2) {
    if (worstMorning.weather.name === worstAfternoon.weather.name) {
      return `${worstMorning.weather.name}, wieczorem ${worstEvening.weather.name}`;
    }
    if (worstMorning.weather.name === worstEvening.weather.name) {
      return `${worstMorning.weather.name}, po południu ${worstAfternoon.weather.name}`;
    }
    return `${worstAfternoon.weather.name}, rano ${worstMorning.weather.name}`;
  }

  return HourlyWeather.worst([worstMorning, worstAfternoon, worstEvening])
    .weather.name;
}
