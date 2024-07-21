import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Aktor from "./aktor";
import Home from "./home";
import Kryspi from "./kryspi";
import Manfred from "./manfred";
import Szyfrownica from "./szyfrownica";

const router = createBrowserRouter([
  { path: "/aktor", element: <Aktor /> },
  { path: "/", element: <Home /> },
  { path: "/kryspi", element: <Kryspi /> },
  { path: "/manfred", element: <Manfred /> },
  { path: "/szyfrownica", element: <Szyfrownica /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
