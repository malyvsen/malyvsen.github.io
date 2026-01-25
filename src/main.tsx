import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { ArticlePage } from "@/components/ArticlePage";
import Aktor from "@/pages/aktor";
import Home from "@/pages/home";
import Pisarz from "@/pages/pisarz";
import pisarzArticles from "@/pages/pisarz/articles";
import Programista from "@/pages/programista";
import programistaArticles from "@/pages/programista/articles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aktor" element={<Aktor />} />
        <Route path="/pisarz" element={<Pisarz />} />
        <Route
          path="/pisarz/:articleId"
          element={<ArticlePage articles={pisarzArticles} />}
        />
        <Route path="/programista" element={<Programista />} />
        <Route
          path="/programista/:articleId"
          element={<ArticlePage articles={programistaArticles} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
