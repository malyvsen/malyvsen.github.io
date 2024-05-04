import { useState } from "react";

import { decrypt, passwordToKey } from "../encryption";

function PasswordGate({
  setCorrectEncryptionKey,
}: {
  setCorrectEncryptionKey: (key: CryptoKey) => void;
}) {
  const [password, setPassword] = useState("");
  const [decryptionStatus, setDecryptionStatus] = useState<
    "success" | "failure" | "decrypting" | "not started"
  >("not started");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const key = await passwordToKey(password);
    try {
      const decryptedData = await decrypt({
        key,
        encryptedData: encryptedStatus,
      });
      if (decryptedData !== "success") {
        throw new Error("decryption failed");
      }
    } catch {
      setDecryptionStatus("failure");
      return;
    }
    setDecryptionStatus("success");
    setCorrectEncryptionKey(key);
  };

  return (
    <>
      <h1>Enter password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Masło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      {decryptionStatus === "not started" ? (
        <></>
      ) : decryptionStatus === "decrypting" ? (
        <p>Decrypting...</p>
      ) : decryptionStatus === "success" ? (
        <p>Decryption successful</p>
      ) : (
        <p>Wrong password, try again</p>
      )}
    </>
  );
}

const encryptedStatus = new Uint8Array([
  173, 55, 69, 219, 232, 101, 132, 82, 49, 63, 220, 23, 186, 1, 114, 176, 30,
  172, 112, 138, 22, 117, 74,
]);

export default PasswordGate;
