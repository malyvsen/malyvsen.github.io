import { Link, useParams } from "react-router";

import { useMediaQuery, useTitle } from "../hooks";

import articles from "./articles";
import type Article from "./Article";
import Footer from "./Footer";

export default function ArticlePage() {
  const { articleId } = useParams();
  const data = articles.find((article) => article.id === articleId);

  if (data === undefined) {
    return <MissingArticlePage />;
  }
  return <ExistingArticlePage data={data} />;
}

function MissingArticlePage() {
  useTitle("Article not found");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Article not found :(</p>
      <Link to=".." relative="path">
        Go to list of articles
      </Link>
    </div>
  );
}

function ExistingArticlePage({ data }: { data: Article }) {
  useTitle(data.title);

  const isWideScreen = useMediaQuery("(min-width: 60em)");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isWideScreen ? (
        <ViewMoreArticles
          style={{
            position: "fixed",
            right: "0.5em",
            bottom: "0.5em",
          }}
        />
      ) : null}
      <div
        style={{
          maxWidth: "40em",
          marginTop: "0",
          marginBottom: "1em",
          marginLeft: "2em",
          marginRight: "2em",
          textAlign: "justify",
        }}
      >
        <div style={{ paddingLeft: "1em", paddingRight: "1em" }}>
          <h1>{data.title}</h1>
          {data.content}
        </div>
        {data.hasFooter ? <Footer /> : null}
        {isWideScreen ? null : (
          <div style={{ textAlign: "right", marginTop: "1em" }}>
            <ViewMoreArticles />
          </div>
        )}
      </div>
    </div>
  );
}

function ViewMoreArticles({ style }: { style?: React.CSSProperties }) {
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
      View more articles
    </Link>
  );
}
