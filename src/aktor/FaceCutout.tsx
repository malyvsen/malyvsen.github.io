export default function Cutout({ style }: { style: React.CSSProperties }) {
  return (
    <img
      src="src/aktor/face-cutout.png"
      style={{
        marginTop: "-9%",
        marginRight: "-10%",
        ...style,
      }}
    />
  );
}
