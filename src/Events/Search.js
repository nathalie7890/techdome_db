import { useState } from "react";

export default function Search({ filters, setFilters }) {
  const [input, setInput] = useState("");
  const searchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, search: input });
  };
  return (
    <div className="flex justify-end w-full mb-2">
      <form onSubmit={searchSubmit} className="flex flex-col">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="rounded-md"
          placeholder="Search"
        />
      </form>
    </div>
  );
}
