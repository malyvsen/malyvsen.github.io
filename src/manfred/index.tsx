import { useState } from "react";
import { useTitle } from "react-use";

import Clients from "@utils/clients";
import PasswordGate from "@utils/PasswordGate";

import ManfredChat from "./components/ManfredChat";

function Manfred() {
  useTitle("Manfred");

  const [clients, setClients] = useState<Clients | null>(null);

  if (clients === null) {
    return <PasswordGate setClients={setClients} />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <ManfredChat clients={clients} />
    </div>
  );
}

export default Manfred;
