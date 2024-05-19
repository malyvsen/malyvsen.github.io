import { useEffect } from "react";

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
        height: "100vh",
        backgroundColor: "#ece0d7",
      }}
    >
      <div style={{ marginTop: "1em" }}>
        <h1 style={{ textAlign: "center" }}>Mikołaj Bocheński</h1>
        <p style={{ fontSize: "1.5em", textAlign: "justify", margin: "2em" }}>
          Cześć! Jestem 25-letnim aktorem z Krakowa. Mówię z dobrym akcentem po
          polsku, angielsku (dzieciństwo spędziłem w Kalifornii), niemiecku,
          holendersku, szwedzku i włosku. Mam doświadczenie przed kamerą i na
          scenie, również musicalowej. Skończyłem roczne studium aktorstwa
          filmowego na Mulholland Academy w Amsterdamie, właśnie kończę pierwszy
          rok Szkoły Wokalno-Aktorskiej w Krakowie.
        </p>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <img
          src="/src/assets/cutout.png"
          style={{
            width: "60%",
            marginTop: "-48px",
            marginRight: "-32px",
            backgroundColor: "inherit",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "1.5em",
              textAlign: "justify",
            }}
          >
            <a href="https://www.facebook.com/malyvsen">Facebook</a>
            <br />
            <a href="https://photos.app.goo.gl/yFrqRuZ5tNMAWF5MA">
              Galeria zdjęć
            </a>
            <br />
            <a href="https://www.youtube.com/watch?v=DupTZI6PZTQ">
              Demo filmowe
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
