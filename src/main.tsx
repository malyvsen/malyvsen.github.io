import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Aktor from "./aktor";
import Home from "./home";
import Kryspi from "./kryspi";
import Manfred from "./manfred";
import Programista from "./programista";
import ArticlePage from "./programista/ArticlePage";
import Szyfrownica from "./szyfrownica";

const router = createBrowserRouter([
  { path: "/aktor", element: <Aktor /> },
  { path: "/", element: <Home /> },
  { path: "/kryspi", element: <Kryspi /> },
  { path: "/manfred", element: <Manfred /> },
  { path: "/programista", element: <Programista /> },
  { path: "/programista/:articleId", element: <ArticlePage /> },
  { path: "/szyfrownica", element: <Szyfrownica /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
