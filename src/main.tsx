import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root.tsx";
import Manfred from "./routes/manfred.tsx";
import Encryption from "./routes/encryption.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/manfred",
    element: <Manfred />,
  },
  {
    path: "/encryption",
    element: <Encryption />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
