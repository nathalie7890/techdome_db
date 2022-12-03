import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { style } from "./styles/ContactSearch.styles";

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
    <div className={style.mainContainer}>
      <form onSubmit={searchSubmit} className={style.form}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={style.searchInput}
          placeholder="Search"
        />
        <button type="submit" className="px-4 ">
          <BsSearch />
        </button>
      </form>

      <button className={style.refreshBtn} onClick={reset}>
        <IoIosRefresh className="text-white" />
      </button>
    </div>
  );
}
