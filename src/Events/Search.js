import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";


export default function Search({ filters, setFilters }) {
  const [input, setInput] = useState("");
  const searchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, search: input });
  };

  const reset = () => {
    setFilters({
      search: "",
      eventAlpha: "",
      eventYear: "dsc",
    });
  };

  return (
    <div className="flex justify-end w-full mb-2 space-x-2">
      <form
        onSubmit={searchSubmit}
        className="flex bg-white border rounded-md border-darkBlue"
      >
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border-none rounded-md focus:border-none focus:ring-0"
          placeholder="Search"
        />
        <button
          type="submit"
          className="px-4 "
        >
          <BsSearch />
        </button>
      </form>
      
        <button
          type="button"
          onClick={reset}
          className="px-4 text-white border rounded-md bg-mediumBlue border-darkBlue hover:bg-blue-200 hover:text-black"
        >
          <IoIosRefresh />
        </button>
     
    </div>
  );
}
