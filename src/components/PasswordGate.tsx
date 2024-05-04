import { useState } from "react";

import { decrypt, passwordToKey } from "../utils/encryption";
import { TypeAnimation } from "react-type-animation";

function PasswordGate({
  decryptData,
}: {
  decryptData: (key: CryptoKey) => Promise<void>;
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
    await decryptData(key);
  };

  return (
    <div style={{ textAlign: "center" }}>
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
