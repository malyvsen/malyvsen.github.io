export default function Aktor() {
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
      <img
        src="/src/assets/cutout.png"
        alt="Fotografia Mikołaja Bocheńskiego"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          verticalAlign: "top",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "50em",
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
