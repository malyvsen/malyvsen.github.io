import { useState } from "react";

import "./PasswordGate.css";

function PasswordGate({ onSubmit }: { onSubmit: (password: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(inputValue);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Enter password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          id="password-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default PasswordGate;
