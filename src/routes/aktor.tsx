import { useEffect } from "react";

export default function Aktor() {
  useEffect(() => {
    document.title = "Mikołaj Bocheński";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ece0d7",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "start",
          height: "100%",
        }}
      >
        <img
          src="/src/assets/cutout.png"
          alt="Fotografia Mikołaja Bocheńskiego"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            verticalAlign: "top",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          maxWidth: "50em",
          marginRight: "2em",
        }}
      >
        <h1>Mikołaj Bocheński</h1>
        <p style={{ fontSize: "1.5em", textAlign: "justify" }}>
          Cześć! Jestem 25-letnim aktorem z Krakowa. Mówię z dobrym akcentem po
          polsku, angielsku (dzieciństwo spędziłem w Kalifornii), niemiecku,
          holendersku, szwedzku i włosku. Mam doświadczenie przed kamerą i na
          scenie, również musicalowej. Skończyłem roczne studium aktorstwa
          filmowego na Mulholland Academy w Amsterdamie, właśnie kończę pierwszy
          rok Szkoły Wokalno-Aktorskiej w Krakowie.
        </p>
        <p style={{ fontSize: "1.5em", textAlign: "justify" }}>
          <a href="https://www.facebook.com/malyvsen">Facebook</a>
          <br />
          <a href="https://photos.app.goo.gl/yFrqRuZ5tNMAWF5MA">
            Galeria zdjęć
          </a>
          <br />
          <a href="https://www.youtube.com/watch?v=DupTZI6PZTQ">Demo filmowe</a>
        </p>
      </div>
    </div>
  );
}
