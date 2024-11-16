import { useState } from "react";
import { useTitle } from "react-use";

import Clients from "@utils/clients";
import PasswordGate from "@components/PasswordGate";

import DecryptedKryspi from "./components/DecryptedKryspi";
import ThemeProvider from "./components/ThemeProvider";

function Kryspi() {
  useTitle("Kryspinów");

  const [clients, setClients] = useState<Clients | null>(null);

  if (clients === null) {
    return (
      <ThemeProvider>
        <PasswordGate setClients={setClients} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <DecryptedKryspi clients={clients} />
    </ThemeProvider>
  );
}

export default Kryspi;
