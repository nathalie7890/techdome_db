import { useState } from "react";

export default function Search({ setSearch}) {
  const [input, setInput] = useState("");
  const searchSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };
  return (
    <div>
      <form onSubmit={searchSubmit}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
