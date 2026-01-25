import { ArticlePage } from "@/components/ArticlePage";

import articles from "./articles";
import Footer from "./Footer";

export default function ProgramistaArticlePage() {
  return <ArticlePage articles={articles} FooterComponent={Footer} />;
}
