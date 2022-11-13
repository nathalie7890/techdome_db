import React from "react";

export default function ContactFilter({ filters, setFilters }) {
  return (
    <div className="space-x-2">
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "" })}
        className="px-6 py-1 font-semibold text-white bg-purple-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.1)] hover:bg-purple-500 border-2 border-gray-300"
      >
        All
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "isAdmin" })}
        className="px-6 py-1  text-white bg-blue-400 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.1)] hover:bg-blue-500 border-2 border-gray-300"
      >
        Admin
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "notAdmin" })}
        className="px-6 py-1 text-white bg-green-300 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.1)] hover:bg-green-400 border-2 border-gray-300"
      >
        Non-Admin
      </button>
    </div>
  );
}
