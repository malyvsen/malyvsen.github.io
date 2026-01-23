import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Aktor from "./aktor";
import Home from "./home";
import Programista from "./programista";
import ArticlePage from "./programista/ArticlePage";

const router = createBrowserRouter([
  { path: "/aktor", element: <Aktor /> },
  { path: "/", element: <Home /> },
  { path: "/programista", element: <Programista /> },
  { path: "/programista/:articleId", element: <ArticlePage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
