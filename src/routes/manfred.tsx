import { useState, useEffect } from "react";

import { Clients, decryptClients } from "../utils/manfred";

import ManfredChat from "../components/ManfredChat";
import PasswordGate from "../components/PasswordGate";

function Manfred() {
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [clients, setClients] = useState<Clients | null>(null);

  useEffect(() => {
    const decryptKeys = async () => {
      if (encryptionKey === null) {
        return;
      }
      const decryptedClients = await decryptClients(encryptionKey);
      setClients(decryptedClients);
    };
    decryptKeys();
  }, [encryptionKey]);

  return encryptionKey === null ? (
    <PasswordGate setCorrectEncryptionKey={setEncryptionKey} />
  ) : clients === null ? (
    <div>Decrypting API clients...</div>
  ) : (
    <ManfredChat clients={clients} />
  );
}

export default Manfred;
