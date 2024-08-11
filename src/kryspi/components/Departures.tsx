import { formatTime } from "@utils/formatTime";
import useDepartures, { Departure } from "@utils/useDepartures";

import "./Departures.css";

export default function Departures({
  stop,
  direction,
}: {
  stop: string;
  direction: string;
}) {
  const {
    data: departures,
    isPending,
    error,
  } = useDepartures({ stop, direction });

  if (isPending) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>Błąd: {error.message}</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "min(100%, 32em)",
      }}
    >
      {departures.map((departure, index) => (
        <DepartureTile key={index} departure={departure} />
      ))}
    </div>
  );
}

function DepartureTile({ departure }: { departure: Departure }) {
  const timeText: React.ReactElement =
    departure.actualTime == departure.scheduledTime ? (
      <>{formatTime(departure.actualTime)}</>
    ) : (
      <>
        <s>{formatTime(departure.scheduledTime)}</s>{" "}
        {formatTime(departure.actualTime)}
      </>
    );
  return (
    <div className="departure">
      <p>{departure.line}</p>
      <div style={{ flexGrow: 1 }} />
      <p>{timeText}</p>
    </div>
  );
}
