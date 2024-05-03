import { useState } from "react";

import PasswordGate from "../components/PasswordGate";

function Manfred() {
  const [password, setPassword] = useState("");

  return (
    <div>
      {password === "" ? (
        <PasswordGate onSubmit={setPassword} />
      ) : (
        <p>You entered {password}</p>
      )}
    </div>
  );
}

export default Manfred;
