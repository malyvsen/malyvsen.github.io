import { formatDate } from "@utils/formatTime";
import useNow from "@utils/useNow";

import "./OneDayWeather.css";

export default function OneDayWeather({
  date,
  maxApparentTemperature,
}: {
  date: Date;
  maxApparentTemperature: number;
}) {
  const now = useNow();

  const daysFromNow = Math.ceil(
    Math.max(0, date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const dayName =
    daysFromNow === 0
      ? "Dziś"
      : daysFromNow === 1
      ? "Jutro"
      : daysFromNow === 2
      ? "Pojutrze"
      : formatDate(date);

  return (
    <div className="one-day-weather">
      <p>{dayName}</p>
      <div style={{ flexGrow: 1 }} />
      <p>{maxApparentTemperature.toFixed(0)}°C</p>
    </div>
  );
}
