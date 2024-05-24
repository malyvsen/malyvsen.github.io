import useScreenSize from "@utils/useScreenSize";

export default function Hello() {
  const { width: screenWidth } = useScreenSize();

  return (
    <>
      <h1>Mikołaj Bocheński</h1>
      <p
        style={{
          fontSize: screenWidth < 600 ? "1em" : "1.5em",
          textAlign: "justify",
        }}
      >
        Cześć! Jestem 25-letnim aktorem z Krakowa. Mówię z dobrym akcentem po
        polsku, angielsku (dzieciństwo spędziłem w Kalifornii), niemiecku,
        holendersku, szwedzku i włosku. Mam doświadczenie przed kamerą i na
        scenie, również musicalowej. Skończyłem roczne studium aktorstwa
        filmowego na Mulholland Academy w Amsterdamie, właśnie kończę pierwszy
        rok Szkoły Wokalno-Aktorskiej w Krakowie.
      </p>
    </>
  );
}
