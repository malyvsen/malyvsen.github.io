import { useState } from "react";

import "./PasswordInput.css";

function PasswordInput({ onSubmit }: { onSubmit: (password: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(inputValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        id="password-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}

export default PasswordInput;
