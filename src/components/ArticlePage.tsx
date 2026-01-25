import { Link, useParams } from "react-router";

import { useMediaQuery, useTitle } from "@/hooks";
import type { Article } from "@/types";

interface ArticlePageProps {
  articles: Article[];
  FooterComponent?: React.ComponentType;
  ViewMoreComponent?: React.ComponentType<{ style?: React.CSSProperties }>;
}

export function ArticlePage({
  articles,
  FooterComponent,
  ViewMoreComponent = ViewMoreArticles,
}: ArticlePageProps) {
  const { articleId } = useParams();
  const data = articles.find((article) => article.id === articleId);

  if (data === undefined) {
    return <MissingArticlePage />;
  }
  return (
    <ExistingArticlePage
      data={data}
      FooterComponent={FooterComponent}
      ViewMoreComponent={ViewMoreComponent}
    />
  );
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

interface ExistingArticlePageProps {
  data: Article;
  FooterComponent?: React.ComponentType;
  ViewMoreComponent: React.ComponentType<{ style?: React.CSSProperties }>;
}

function ExistingArticlePage({
  data,
  FooterComponent,
  ViewMoreComponent,
}: ExistingArticlePageProps) {
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
        <ViewMoreComponent
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
        {data.hasFooter && FooterComponent ? <FooterComponent /> : null}
        {isWideScreen ? null : (
          <div style={{ textAlign: "right", marginTop: "1em" }}>
            <ViewMoreComponent />
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
