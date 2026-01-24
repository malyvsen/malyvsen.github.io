import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Aktor from "@/pages/aktor";
import Home from "@/pages/home";
import Programista from "@/pages/programista";
import ArticlePage from "@/pages/programista/ArticlePage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aktor" element={<Aktor />} />
        <Route path="/programista" element={<Programista />} />
        <Route path="/programista/:articleId" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
