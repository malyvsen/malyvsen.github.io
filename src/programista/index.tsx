import { useTitle } from "react-use";
import { Link } from "react-router-dom";

import MalyvsenPage from "@components/MalyvsenPage";

import articles from "./articles";
import Article from "./Article";

export default function Programista() {
  useTitle("Mikołaj Bocheński");

  return (
    <MalyvsenPage>
      <div>
        <p style={{ marginTop: "0", marginBottom: "0", fontSize: "2em" }}>
          Never-seen-before crossbreed of AI&nbsp;researcher and
          clean&nbsp;coder.
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
      {articles.map((article) => (
        <ArticleLink key={article.title} article={article} />
      ))}
    </MalyvsenPage>
  );
}

function ArticleLink({ article }: { article: Article }) {
  return (
    <Link className="hover-link" style={{ fontSize: "2em" }} to={article.id}>
      {article.title}
    </Link>
  );
}
