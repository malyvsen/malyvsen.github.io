import "./root.css";

import { Link } from "react-router-dom";
import Malyvsen from "../components/Malyvsen";

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
          fontSize: "48px",
          fontWeight: 400,
          color: "black",
          writingMode: "vertical-rl",
          rotate: "180deg",
          margin: "1rem",
          padding: "0",
        }}
      >
        <Malyvsen />
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Link className="link" to="/actor">
          actor
        </Link>
        <Link className="link" to="/writer">
          writer
        </Link>
        <Link className="link" to="/programmer">
          programmer
        </Link>
      </div>
    </div>
  );
}

export default Root;
