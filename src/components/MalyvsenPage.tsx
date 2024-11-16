import MalyvsenAnimation from "./MalyvsenAnimation";

export default function MalyvsenPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        top: "25vh",
        left: "25vw",
        height: "50vh",
        width: "50vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          writingMode: "vertical-rl",
          rotate: "180deg",
          margin: "1rem",
          padding: "0",
        }}
      >
        <MalyvsenAnimation />
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {children}
      </div>
    </div>
  );
}
