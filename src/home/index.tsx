import { Link } from "react-router-dom";
import { useTitle } from "react-use";

import MalyvsenPage from "@components/MalyvsenPage";

export default function Home() {
  useTitle("Malyvsen");

  return (
    <MalyvsenPage>
      <BigLink to="aktor" />
      <BigLink to="pisarz" />
      <BigLink to="programista" />
    </MalyvsenPage>
  );
}

function BigLink({ to }: { to: string }) {
  return (
    <Link
      className="hover-link"
      style={{ fontSize: "3em", marginTop: "10px", marginBottom: "10px" }}
      to={to}
    >
      {to}
    </Link>
  );
}
