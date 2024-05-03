import "./App.css";

import Malyvsen from "./Malyvsen";

function App() {
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
        <a className="link" href="/actor">
          actor
        </a>
        <a className="link" href="/writer">
          writer
        </a>
        <a className="link" href="/programmer">
          programmer
        </a>
      </div>
    </div>
  );
}

export default App;
