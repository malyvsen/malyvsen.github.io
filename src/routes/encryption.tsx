import { useState } from "react";

import { encrypt, decrypt, passwordToKey } from "../encryption";

function Encryption() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null);
  const [decryptedData, setDecryptedData] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const key = await passwordToKey(password);

    const encryptedData = await encrypt({
      key,
      data,
    });
    setEncryptedData(encryptedData);

    const decryptedData = await decrypt({
      key,
      encryptedData,
    });
    setDecryptedData(decryptedData);
  };

  return (
    <>
      <h1>Encryption playground</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          Data:{" "}
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </p>
        <button type="submit" style={{ display: "none" }} />
      </form>
      <p>Encrypted payload:</p>
      <pre>{encryptedData?.join(", ")}</pre>
      <p>Decrypted payload: </p>
      <pre>{decryptedData}</pre>
    </>
  );
}

export default Encryption;