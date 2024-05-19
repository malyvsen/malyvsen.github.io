import { useEffect, useState } from "react";

import { Clients, decryptClients } from "../utils/manfred/clients";

import ManfredChat from "../components/ManfredChat";
import PasswordGate from "../components/PasswordGate";

import ThemeProvider from "../components/ThemeProvider";

function Manfred() {
  const [clients, setClients] = useState<Clients | null>(null);

  const setDecryptedClients = async (key: CryptoKey) => {
    const decryptedClients = await decryptClients(key);
    setClients(decryptedClients);
  };

  useEffect(() => {
    document.title = "Manfred";
  }, []);

  return (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "85vh",
        }}
      >
        {clients === null ? (
          <PasswordGate decryptData={setDecryptedClients} />
        ) : (
          <ManfredChat clients={clients} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default Manfred;
