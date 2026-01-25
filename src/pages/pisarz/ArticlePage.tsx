import { ArticlePage } from "@/components/ArticlePage";

import articles from "./articles";
import ViewMore from "./ViewMore";

export default function PisarzArticlePage() {
  return <ArticlePage articles={articles} ViewMoreComponent={ViewMore} />;
}
