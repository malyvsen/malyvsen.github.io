import "./App.css";

function App() {
  return (
    <>
      <h1>malyvsen</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <a href="/actor" style={{ marginBottom: 20 }}>
          actor
        </a>
        <a href="/writer" style={{ marginBottom: 20 }}>
          writer
        </a>
        <a href="/programmer">programmer</a>
      </div>
    </>
  );
}

export default App;
