import { Link } from "react-router";

export default function ViewMore({ style }: { style?: React.CSSProperties }) {
  return (
    <Link
      to=".."
      relative="path"
      style={{
        ...style,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      Zobacz inne artykuły
    </Link>
  );
}
