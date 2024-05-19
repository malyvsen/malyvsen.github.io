import { useEffect } from "react";

import Cutout from "./FaceCutout";
import Hello from "./Hello";
import Links from "./Links";

export default function Aktor() {
  useEffect(() => {
    document.title = "Mikołaj Bocheński";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ece0d7",
      }}
    >
      <Hello />
      <div style={{ display: "flex", width: "100%" }}>
        <Cutout style={{ width: "60%" }} />
        <Links />
      </div>
    </div>
  );
}
