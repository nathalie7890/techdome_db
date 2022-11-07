import React from "react";

export default function SortEvent({ filters, setFilters }) {
  const filterOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "eventAlpha")
      setFilters({ ...filters, eventAlpha: value, eventYear: "" });
    if (name === "eventYear")
      setFilters({ ...filters, eventAlpha: "", eventYear: value });
  };

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <select
          name="eventAlpha"
          className="text-sm rounded-full"
          onChange={filterOnChange}
          value={filters.eventAlpha}
        >
          <option value="">Alphabetically</option>
          <option value="asc">A - Z</option>
          <option value="dsc">Z - A</option>
        </select>
      </div>
      <div className="flex flex-col">
        <select
          name="eventYear"
          className="text-sm rounded-full"
          onChange={filterOnChange}
          value={filters.eventYear}
        >
          <option value="">By Year</option>
          <option value="dsc">Latest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>
  );
}
