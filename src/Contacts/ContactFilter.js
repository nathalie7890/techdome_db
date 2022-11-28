import React from "react";

export default function ContactFilter({ filters, setFilters }) {
  return (
    <div className="flex py-2 mt-8 space-x-2 overflow-x-auto md:mt-0 flex-nowrap max-h-16 whitespace-nowrap">
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "" })}
        className="px-4 py-1 font-semibold text-white bg-purple-500 rounded-full shadow-md sm:px-6 hover:bg-purple-600"
      >
        All
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "isAdmin" })}
        className="px-4 py-1 text-white bg-blue-500 rounded-full shadow-md sm:px-6 hover:bg-blue-600"
      >
        Admin
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "notAdmin" })}
        className="px-4 py-1 text-white bg-green-400 rounded-full shadow-md sm:px-6 hover:bg-green-500"
      >
        Non-Admin
      </button>
    </div>
  );
}
