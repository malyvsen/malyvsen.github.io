import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./home";
import Aktor from "./aktor";
import Manfred from "./manfred";
import Szyfrownica from "./szyfrownica";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/aktor",
    element: <Aktor />,
  },
  {
    path: "/manfred",
    element: <Manfred />,
  },
  {
    path: "/szyfrownica",
    element: <Szyfrownica />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
