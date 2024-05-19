import "./root.css";

import { Link } from "react-router-dom";
import MalyvsenAnimation from "../components/MalyvsenAnimation";

function Root() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        top: "25vh",
        left: "25vw",
        height: "50vh",
        width: "50vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          writingMode: "vertical-rl",
          rotate: "180deg",
          margin: "1rem",
          padding: "0",
        }}
      >
        <MalyvsenAnimation />
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <BigLink to="aktor" />
        <BigLink to="pisarz" />
        <BigLink to="programista" />
      </div>
    </div>
  );
}

function BigLink({ to }: { to: string }) {
  return (
    <Link className="big-link" to={to}>
      {to}
    </Link>
  );
}

export default Root;
