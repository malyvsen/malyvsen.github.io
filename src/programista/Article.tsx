import React from "react";

export default interface Article {
  title: string;
  content: React.ReactNode;
  hasFooter: boolean;
}

export function getArticleSlug(article: Article): string {
  return article.title.toLowerCase().replace(" ", "-");
}
