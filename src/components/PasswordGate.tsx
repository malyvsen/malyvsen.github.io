import { useState, useEffect } from "react";

import PasswordInput from "../components/PasswordInput";

import { decrypt, passwordToKey } from "../encryption";

function PasswordGate({
  setCorrectEncryptionKey,
}: {
  setCorrectEncryptionKey: (key: CryptoKey) => void;
}) {
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
        setCorrectEncryptionKey(encryptionKey);
      } catch {
        setDecryptionStatus("failure");
      }
    };

    decryptData();
  }, [encryptionKey, setCorrectEncryptionKey]);

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
  173, 55, 69, 219, 232, 101, 132, 82, 49, 63, 220, 23, 186, 1, 114, 176, 30,
  172, 112, 138, 22, 117, 74,
]);

export default PasswordGate;
