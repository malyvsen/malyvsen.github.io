import { useEffect, useState } from "react";

import useNow from "@utils/useNow";

import { Clients, decryptClients } from "../manfred/utils/clients";

import ManfredChat from "../manfred/components/ManfredChat";
import PasswordGate from "../manfred/components/PasswordGate";

import ThemeProvider from "./components/ThemeProvider";

function Kryspi() {
  const [clients, setClients] = useState<Clients | null>(null);

  const now = useNow();

  const setDecryptedClients = async (key: CryptoKey) => {
    const decryptedClients = await decryptClients(key);
    setClients(decryptedClients);
  };

  useEffect(() => {
    document.title = "Kryspinów";
  }, []);

  if (clients === null) {
    return (
      <ThemeProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85vh",
          }}
        >
          <PasswordGate decryptData={setDecryptedClients} />
        </div>
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
