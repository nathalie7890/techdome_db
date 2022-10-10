import React from "react";

export default function SearchIc({ onChange, filters }) {
  return (
    <div className="flex flex-col w-1/5">
      <label className="text-sm text-zinc-600">IC Number</label>
      <input
        type="text"
        name="ic"
        className="rounded-md"
        onChange={onChange}
        filters={filters.ic}
      />
    </div>
  );
}
