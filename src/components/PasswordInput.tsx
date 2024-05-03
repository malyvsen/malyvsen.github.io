import { useState } from "react";

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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}

export default PasswordInput;
