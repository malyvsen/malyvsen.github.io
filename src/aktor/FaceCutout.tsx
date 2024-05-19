import faceCutout from "./face-cutout.png";

export default function FaceCutout({ style }: { style: React.CSSProperties }) {
  return (
    <img
      src={faceCutout}
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
