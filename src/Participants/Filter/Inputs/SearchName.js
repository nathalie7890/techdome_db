import React from "react";

export default function SearchName({ onChange, filters }) {
  return (
    <div className="flex flex-col w-1/5">
      <label className="text-sm text-zinc-600">Name</label>
      <input
        type="text"
        name="name"
        className="rounded-md"
        onChange={onChange}
      value={filters.name}
      />
    </div>
  );
}
