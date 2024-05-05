import { useState } from "react";

import { Clients, decryptClients } from "../utils/manfred/clients";

import ManfredChat from "../components/ManfredChat";
import PasswordGate from "../components/PasswordGate";

function Manfred() {
  const [clients, setClients] = useState<Clients | null>(null);

  const setDecryptedClients = async (key: CryptoKey) => {
    const decryptedClients = await decryptClients(key);
    setClients(decryptedClients);
  };

  return (
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
  );
}

export default Manfred;
