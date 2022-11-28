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
        className="flex justify-between w-full bg-white border rounded-full shadow-sm xs:max-w-fit"
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
        className="px-3 py-3 text-center bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
        onClick={reset}
      >
        <IoIosRefresh className="text-white" />
      </button>
    </div>
  );
}
