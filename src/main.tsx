import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Aktor from "./aktor";
import Home from "./home";
import Programista from "./programista";
import ArticlePage from "./programista/ArticlePage";

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
