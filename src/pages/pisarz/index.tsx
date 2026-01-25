import { Link } from "react-router";

import { MalyvsenPage } from "@/layouts";
import { useTitle } from "@/hooks";
import type { Article } from "@/types";

import articles from "./articles";

export default function Pisarz() {
  useTitle("Mikołaj Bocheński");

  return (
    <MalyvsenPage>
      <div>
        <p style={{ marginTop: "0", marginBottom: "0", fontSize: "2em" }}>
          Piszę czasami.
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
