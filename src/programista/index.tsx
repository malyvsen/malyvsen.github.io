import { useTitle } from "react-use";
import { Link } from "react-router-dom";

import MalyvsenPage from "@components/MalyvsenPage";

export default function Programista() {
  useTitle("Mikołaj Bocheński");

  return (
    <MalyvsenPage>
      <div>
        <p style={{ marginTop: "0", marginBottom: "0", fontSize: "2em" }}>
          Self-taught AI researcher.
        </p>
        <p style={{ marginTop: "0", fontSize: "1.4em" }}>
          <a className="hover-link" href="https://github.com/malyvsen/">
            GitHub
          </a>{" "}
          &middot;{" "}
          <a
            className="hover-link"
            href="https://www.linkedin.com/in/malyvsen/"
          >
            LinkedIn
          </a>
        </p>
      </div>
      <ArticleLink to="Research code" />
      <ArticleLink to="Polonizacja programowania" />
      <ArticleLink to="A perspective on how LLMs work" />
    </MalyvsenPage>
  );
}

function ArticleLink({ to }: { to: string }) {
  return (
    <Link className="hover-link" style={{ fontSize: "2em" }} to={to}>
      {to}
    </Link>
  );
}
