import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

import Clients, { decryptClients } from "@utils/clients";
import { decrypt, passwordToKey } from "@utils/encryption";

function PasswordGate({
  setClients,
}: {
  setClients: (clients: Clients) => void;
}) {
  const [password, setPassword] = useState("");
  const [decryptionStatus, setDecryptionStatus] = useState<
    "failure" | "decrypting" | "not started"
  >("not started");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDecryptionStatus("decrypting");
    const key = await passwordToKey(password);

    try {
      const decryptedStatus = await decrypt({
        key,
        encryptedData: encryptedStatus,
      });
      if (decryptedStatus !== "success") {
        throw new Error("decryption failed");
      }
    } catch {
      setDecryptionStatus("failure");
      return;
    }

    const decryptedClients = await decryptClients(key);
    setClients(decryptedClients);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <h1>Podaj hasło</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Masło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }} />
      </form>
      {decryptionStatus === "not started" ? (
        <></>
      ) : decryptionStatus === "decrypting" ? (
        <p>
          <TypeAnimation
            sequence={["Rozszyfrowywanie", "Rozszyfrowywanie..."]}
            wrapper="span"
            preRenderFirstString={true}
            cursor={true}
            repeat={0}
            speed={{ type: "keyStrokeDelayInMs", value: 500 }}
          />
        </p>
      ) : (
        <p>Złe hasło, spróbuj ponownie</p>
      )}
    </div>
  );
}

const encryptedStatus = new Uint8Array([
  173, 55, 69, 219, 232, 101, 132, 82, 49, 63, 220, 23, 186, 1, 114, 176, 30,
  172, 112, 138, 22, 117, 74,
]);

export default PasswordGate;
