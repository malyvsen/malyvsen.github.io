import { formatDate } from "@utils/formatTime";
import useNow from "@utils/useNow";
import useWeather from "@utils/useWeather";
import { HourlyWeather } from "@utils/weather";
import WeatherCode from "@utils/weatherCode";

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
    .map((hourlyWeather) => hourlyWeather.apparentTemperature)
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

  const morningCodes = HourlyWeather.inRange(
    hourlyWeather,
    morningStart,
    afternoonStart
  ).map((weather) => weather.code);
  const morningCode = WeatherCode.aggregate(morningCodes);

  const afternoonCodes = HourlyWeather.inRange(
    hourlyWeather,
    afternoonStart,
    eveningStart
  ).map((weather) => weather.code);
  const afternoonCode = WeatherCode.aggregate(afternoonCodes);

  const eveningCodes = HourlyWeather.inRange(
    hourlyWeather,
    eveningStart,
    nextDayStart
  ).map((weather) => weather.code);
  const eveningCode = WeatherCode.aggregate(eveningCodes);

  const uniqueGroups = new Set([
    morningCode.group,
    afternoonCode.group,
    eveningCode.group,
  ]);

  if (uniqueGroups.size === 1) {
    return morningCode.name;
  }

  if (uniqueGroups.size === 2) {
    if (morningCode.group === afternoonCode.group) {
      const groupedCode = WeatherCode.aggregate(
        Array.prototype.concat(morningCodes, afternoonCodes)
      );
      return `${groupedCode.name}, wieczorem ${eveningCode.name}`;
    }
    if (morningCode.group === eveningCode.group) {
      const groupedCode = WeatherCode.aggregate(
        Array.prototype.concat(morningCodes, eveningCodes)
      );
      return `${groupedCode.name}, po południu ${afternoonCode.name}`;
    }
    const groupedCode = WeatherCode.aggregate(
      Array.prototype.concat(afternoonCodes, eveningCode)
    );
    return `${groupedCode.name}, rano ${morningCode.name}`;
  }

  return WeatherCode.aggregate(
    Array.prototype.concat(morningCodes, afternoonCodes, eveningCodes)
  ).name;
}
