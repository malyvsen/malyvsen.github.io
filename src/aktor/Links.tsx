export default function Links({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...style,
      }}
    >
      <p style={{ fontSize: "1.4em" }}>
        <a href="https://www.facebook.com/malyvsen">Facebook</a>
        <br />
        <a href="https://photos.app.goo.gl/yFrqRuZ5tNMAWF5MA">Galeria zdjęć</a>
        <br />
        <a href="https://www.youtube.com/watch?v=DupTZI6PZTQ">Demo filmowe</a>
      </p>
    </div>
  );
}
