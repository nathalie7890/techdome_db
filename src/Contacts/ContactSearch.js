import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { styles } from "./styles/ContactSearch.styles";

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
    <div className={styles.mainContainer}>
      <form onSubmit={searchSubmit} className={styles.form}>
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
