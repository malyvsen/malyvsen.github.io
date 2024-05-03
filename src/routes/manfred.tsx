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

  return password === null ? (
    <PasswordInput onSubmit={setPassword} />
  ) : decryptionStatus === null ? (
    <p>Decryption in progress...</p>
  ) : decryptionStatus === "success" ? (
    <p>Decryption successful</p>
  ) : (
    <p>Decryption failed</p>
  );
}

const encryptedStatus = new Uint8Array([
  192, 90, 77, 136, 66, 10, 236, 186, 234, 149, 8, 16, 151, 237, 181, 62, 207,
  56, 221, 41, 204, 71, 248,
]);

export default Manfred;
