import { useState, useEffect } from "react";

import PasswordInput from "../components/PasswordInput";
import { encrypt, decrypt, passwordToKey } from "../encryption";

function Encryption() {
  const [password, setPassword] = useState<string | null>(null);
  const [payload, setPayload] = useState("");
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null);
  const [decryptedData, setDecryptedData] = useState<string | null>(null);

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
    const encryptData = async () => {
      if (encryptionKey === null) {
        return;
      }
      const encryptedData = await encrypt({
        key: encryptionKey,
        data: payload,
      });
      setEncryptedData(encryptedData);
    };

    encryptData();
  }, [encryptionKey, payload]);

  useEffect(() => {
    const decryptData = async () => {
      if (encryptionKey === null) {
        return;
      }
      if (encryptedData === null) {
        return;
      }
      const decryptedData = await decrypt({
        key: encryptionKey,
        encryptedData,
      });
      setDecryptedData(decryptedData);
    };

    decryptData();
  }, [encryptionKey, encryptedData]);

  return (
    <>
      Password: <PasswordInput onSubmit={setPassword} />
      Data:{" "}
      <input
        type="text"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
      />
      <p>Encrypted payload:</p>
      <pre>{encryptedData?.join(", ")}</pre>
      <p>Decrypted payload: </p>
      <pre>{decryptedData}</pre>
    </>
  );
}

export default Encryption;
