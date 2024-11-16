import { useTitle } from "react-use";
import { Link } from "react-router-dom";

import MalyvsenAnimation from "@components/MalyvsenAnimation";

function Programista() {
  useTitle("Mikołaj Bocheński");

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
        <div>
          <p style={{ marginTop: "0", marginBottom: "0", fontSize: "2em" }}>
            Self-taught AI researcher.
          </p>
          <p
            style={{
              marginTop: "0",
              marginBottom: "0.5em",
              fontSize: "1.5em",
            }}
          >
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
      </div>
    </div>
  );
}

function ArticleLink({ to }: { to: string }) {
  return (
    <Link className="hover-link" style={{ fontSize: "2em" }} to={to}>
      {to}
    </Link>
  );
}

export default Programista;
