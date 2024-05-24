import { useEffect } from "react";

import FaceCutout from "./FaceCutout";
import Hello from "./Hello";
import Links from "./Links";
import useScreenSize from "@utils/useScreenSize";

export default function Aktor() {
  const { width: screenWidth } = useScreenSize();
  const backgroundColor = "#ece0d7";

  useEffect(() => {
    document.title = "Mikołaj Bocheński";
  }, []);

  if (screenWidth < 900) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: backgroundColor,
        }}
      >
        <div style={{ marginLeft: "2em", marginRight: "2em" }}>
          <Hello />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <FaceCutout style={{ width: "60%" }} />
          <div style={{ width: "2em" }}></div>
          <Links />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        minHeight: "100vh",
        backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "start",
          alignSelf: "end",
          maxWidth: "40%",
          height: "100%",
        }}
      >
        <FaceCutout style={{ maxWidth: "100%", maxHeight: "95%" }} />
      </div>
      <div
        style={{
          width: "75%",
          maxWidth: "50em",
          marginRight: "2em",
          alignSelf: "center",
        }}
      >
        <Hello />
        <Links />
      </div>
    </div>
  );
}
