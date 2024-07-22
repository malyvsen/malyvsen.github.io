import OneDayWeather from "./OneDayWeather";

export default function WeatherWidget() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "min(100%, 32em)",
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <OneDayWeather key={index} daysFromToday={index} />
      ))}
    </div>
  );
}
