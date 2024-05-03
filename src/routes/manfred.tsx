import { useState, useEffect } from "react";

import PasswordGate from "../components/PasswordGate";
import { encrypt, decrypt } from "../encryption";

function Manfred() {
  const [password, setPassword] = useState<string | null>(null);
  const [payload, setPayload] = useState("");
  const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null);
  const [decryptedData, setDecryptedData] = useState<string | null>(null);

  useEffect(() => {
    const encryptData = async () => {
      if (password === null) {
        return;
      }
      const encryptedData = await encrypt({ password, data: payload });
      setEncryptedData(encryptedData);
    };

    encryptData();
  }, [password, payload]);

  useEffect(() => {
    const decryptData = async () => {
      if (password === null) {
        return;
      }
      if (encryptedData === null) {
        return;
      }
      const decryptedData = await decrypt({
        password,
        encryptedData,
      });
      setDecryptedData(decryptedData);
    };

    decryptData();
  }, [password, encryptedData]);

  return (
    <div>
      {password === null ? (
        <PasswordGate onSubmit={setPassword} />
      ) : (
        <>
          <input
            type="text"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />
          <p>Password: {password}</p>
          {encryptedData === null ? (
            <p>Encrypted data is null</p>
          ) : (
            <p>Encrypted payload: {encryptedData.join(", ")}</p>
          )}
          {decryptedData === null ? (
            <p>Decrypted data is null</p>
          ) : (
            <p>Decrypted payload: {decryptedData}</p>
          )}
        </>
      )}
    </div>
  );
}

export default Manfred;
