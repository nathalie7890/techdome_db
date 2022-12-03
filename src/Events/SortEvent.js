import React from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import { styles } from "./styles/SortEvent.styles";

export default function SortEvent({ filters, setFilters }) {
  const nameSort = () => {
    if (filters.eventAlpha === "asc") {
      setFilters({ ...filters, eventAlpha: "dsc", eventYear: "" });
    } else {
      setFilters({ ...filters, eventAlpha: "asc", eventYear: "" });
    }
  };

  const yearSort = () => {
    if (filters.eventYear === "asc") {
      setFilters({ ...filters, eventAlpha: "", eventYear: "dsc" });
    } else {
      setFilters({ ...filters, eventAlpha: "", eventYear: "asc" });
    }
  };

  return (
    <div className="flex space-x-4">
      <button onClick={nameSort} className={styles.nameSort}>
        <span className={styles.nameSortSpan}>
          Event
          <RiArrowUpDownFill />
        </span>
      </button>
      <button onClick={yearSort} className={styles.yearSort}>
        <span className={styles.yearSortSpan}>
          Year
          <RiArrowUpDownFill />
        </span>
      </button>
    </div>
  );
}
