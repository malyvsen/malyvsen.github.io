export default function FaceCutout({ style }: { style: React.CSSProperties }) {
  return (
    <img
      src="src/aktor/face-cutout.png"
      style={{
        marginTop: "-9%",
        marginRight: "-10%",
        objectFit: "contain",
        verticalAlign: "top",
        ...style,
      }}
    />
  );
}
