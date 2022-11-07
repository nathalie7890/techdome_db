import { useState } from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
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
      <Tooltip title="Reset" placement="top" arrow>
        <Fab color="primary" aria-label="add" size="small" onClick={reset}>
          <IoIosRefresh />
        </Fab>
      </Tooltip>
    </div>
  );
}
