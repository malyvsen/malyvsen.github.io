import { useState } from "react";
import { useTitle } from "react-use";

import Clients from "@utils/clients";
import useNow from "@utils/useNow";

import ManfredChat from "../manfred/components/ManfredChat";
import PasswordGate from "../utils/PasswordGate";

import ThemeProvider from "./components/ThemeProvider";

function Kryspi() {
  useTitle("Kryspinów");

  const [clients, setClients] = useState<Clients | null>(null);
  const now = useNow();

  if (clients === null) {
    return (
      <ThemeProvider>
        <PasswordGate setClients={setClients} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "50%",
            height: "100%",
          }}
        >
          <ManfredChat clients={clients} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
            height: "100%",
          }}
        >
          <h1>
            {String(now.getHours()).padStart(2, "0")}:
            {String(now.getMinutes()).padStart(2, "0")}
          </h1>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Kryspi;
