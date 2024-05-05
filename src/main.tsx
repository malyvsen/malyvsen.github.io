import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root.tsx";
import Manfred from "./routes/manfred.tsx";
import Encryption from "./routes/encryption.tsx";

import ThemeProvider from "./components/ThemeProvider";

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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
