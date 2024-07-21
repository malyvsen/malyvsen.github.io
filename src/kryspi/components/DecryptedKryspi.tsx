import Clients from "@utils/clients";
import { formatDate, formatTime } from "@utils/formatTime";
import useNow from "@utils/useNow";

import ManfredChat from "../../manfred/components/ManfredChat";
import WeatherWidget from "./WeatherWidget";

export default function DecryptedKryspi({ clients }: { clients: Clients }) {
  const now = useNow();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "50%",
          height: "100%",
        }}
      >
        <ManfredChat clients={clients} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          height: "100%",
        }}
      >
        <h1 style={{ marginBottom: "0" }}>{formatTime(now)}</h1>
        <p style={{ marginTop: "0" }}>{formatDate(now)}</p>
        <WeatherWidget />
      </div>
    </div>
  );
}
