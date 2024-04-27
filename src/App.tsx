import "./App.css";

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
        alignItems: "flex-end",
      }}
    >
      <h1
        style={{
          writingMode: "vertical-rl",
          rotate: "180deg",
          margin: "0",
          padding: "0",
        }}
      >
        malyvsen
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <a href="/actor">actor</a>
        <a href="/writer">writer</a>
        <a href="/programmer">programmer</a>
      </div>
    </div>
  );
}

export default App;
