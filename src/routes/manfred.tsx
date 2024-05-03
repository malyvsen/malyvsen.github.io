import { useState, useEffect } from "react";

import PasswordInput from "../components/PasswordInput";

import { decrypt, passwordToKey } from "../encryption";

function Manfred() {
  const [password, setPassword] = useState<string | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [decryptionStatus, setDecryptionStatus] = useState<string | null>(null);

  useEffect(() => {
    const generateKey = async () => {
      if (password === null) {
        return;
      }
      const key = await passwordToKey(password);
      setEncryptionKey(key);
    };

    generateKey();
  }, [password]);

  useEffect(() => {
    const decryptData = async () => {
      if (encryptionKey === null) {
        return;
      }
      try {
        const decryptedData = await decrypt({
          key: encryptionKey,
          encryptedData: encryptedStatus,
        });
        setDecryptionStatus(decryptedData);
      } catch {
        setDecryptionStatus("failure");
      }
    };

    decryptData();
  }, [encryptionKey]);

  return decryptionStatus === null ? (
    <div style={{ textAlign: "center" }}>
      <h1>Enter password</h1>
      <PasswordInput onSubmit={setPassword} />
    </div>
  ) : decryptionStatus === "success" ? (
    <p>Decryption successful</p>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1>Wrong password, try again</h1>
      <PasswordInput onSubmit={setPassword} />
    </div>
  );
}

const encryptedStatus = new Uint8Array([
  116, 48, 18, 185, 178, 231, 181, 85, 163, 7, 227, 83, 32, 243, 91, 143, 234,
  221, 72, 168, 169, 44, 128,
]);

export default Manfred;
