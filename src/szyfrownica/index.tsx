import { useState } from "react";
import { useTitle } from "react-use";

import { decrypt, encrypt, passwordToKey } from "../utils/encryption";

function Szyfrownica() {
  useTitle("Szyfrownica");

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "min(50%, 32em)" }}>
        <h1>Szyfrownica</h1>
        <form onSubmit={handleSubmit}>
          <p>
            Hasło:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            Dane:{" "}
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </p>
          <button type="submit" style={{ display: "none" }} />
        </form>
        <p>Zaszyfrowane dane:</p>
        <p>{encryptedData?.join(", ")}</p>
        <p>Rozszyfrowane dane: </p>
        <p style={{ wordBreak: "break-all" }}>{decryptedData}</p>
      </div>
    </div>
  );
}

export default Szyfrownica;
