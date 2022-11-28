import React from "react";
import { RiArrowUpDownFill } from "react-icons/ri";

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
      <button
        onClick={nameSort}
        className="font-semibold text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
      >
        <span className="flex items-center justify-center gap-1 px-6 py-1">
          Event
          <RiArrowUpDownFill />
        </span>
      </button>
      <button
        onClick={yearSort}
        className="font-semibold text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
      >
        <span className="flex items-center justify-center gap-1 px-6 py-1">
          Year
          <RiArrowUpDownFill />
        </span>
      </button>
    </div>
  );
}
