import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { styles } from "./styles/SearchEvent.styles";

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
    <div className={styles.mainContainer}>
      <form onSubmit={searchSubmit} className={styles.searchForm}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={styles.searchInput}
          placeholder="Search"
        />
        <button type="submit" className="px-4 ">
          <BsSearch />
        </button>
      </form>

      <button className={styles.refreshBtn} onClick={reset}>
        <IoIosRefresh className="text-white" />
      </button>
    </div>
  );
}
