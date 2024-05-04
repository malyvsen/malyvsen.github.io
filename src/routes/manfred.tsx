import { useState } from "react";

import PasswordGate from "../components/PasswordGate";

function Manfred() {
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);

  return encryptionKey === null ? (
    <PasswordGate setCorrectEncryptionKey={setEncryptionKey} />
  ) : (
    <h1>Manfred</h1>
  );
}

export default Manfred;
