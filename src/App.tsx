import "./App.css";

function App() {
  return (
    <>
      <h1>malyvsen</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "25vh",
          left: "25vw",
          height: "50vh",
          width: "50vw",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <a href="/actor">actor</a>
        <a href="/writer">writer</a>
        <a href="/programmer">programmer</a>
      </div>
    </>
  );
}

export default App;
