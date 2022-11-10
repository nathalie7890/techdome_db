import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";

export default function ContactSearch({ filters, setFilters }) {
  const [input, setInput] = useState("");
  const searchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, search: input });
  };

  const reset = () => {
    setFilters({
      search: "",
      nameAlpha: "",
      isAdmin: "",
    });
  };
  return (
    <div className="flex justify-end w-full space-x-2">
      <form
        onSubmit={searchSubmit}
        className="flex bg-white border rounded-full border-darkBlue"
      >
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border-none rounded-full focus:border-none focus:ring-0"
          placeholder="Search"
        />
        <button type="submit" className="px-4 ">
          <BsSearch />
        </button>
      </form>

      <button
        className="px-3 py-3 bg-blue-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-blue-600 text-center border border-gray-400"
        onClick={reset}
      >
        <IoIosRefresh className="text-white" />
      </button>
    </div>
  );
}
