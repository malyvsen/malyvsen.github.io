import { useState } from "react";

import ManfredChat from "../components/ManfredChat";
import PasswordGate from "../components/PasswordGate";

function Manfred() {
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);

  return encryptionKey === null ? (
    <PasswordGate setCorrectEncryptionKey={setEncryptionKey} />
  ) : (
    <ManfredChat encryptionKey={encryptionKey} />
  );
}

export default Manfred;
