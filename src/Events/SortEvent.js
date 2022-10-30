import React from "react";

export default function SortEvent({ filters, setFilters }) {
  const filterOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        {/* <label htmlFor="eventAlpha">Sort Alphabetically</label> */}
        <select
          name="eventAlpha"
          className="rounded-md"
          onChange={filterOnChange}
          value={filters.eventAlpha}
        >
          <option value="">Alphabetically</option>
          <option value="asc">A - Z</option>
          <option value="dsc">Z - A</option>
        </select>
      </div>
      <div className="flex flex-col">
        {/* <label htmlFor="eventYear">Sort By Year</label> */}
        <select
          name="eventYear"
          className="rounded-md"
          onChange={filterOnChange}
          value={filters.eventYear}
        >
          <option value="dsc">By Year</option>
          <option defaultValue="dsc">Latest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>
  );
}
