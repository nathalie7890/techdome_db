import { useState } from "react";
import SelectEvent from "./Inputs/SelectEvent";
import SelectSO from "./Inputs/SelectSO";
import SelectAge from "./Inputs/SelectAge";
import SearchName from "./Inputs/SearchName";
import SearchIc from "./Inputs/SearchIc";

const Filter = ({ rawData, setFilters, filters }) => {
  const onChangeHandler = (field) => (e) => {
    const { value } = e.target;
    setFilters({ ...filters, [field]: value });
  };

  const clearFilter = () => {
    setFilters({
      ...filters,
      event: "all",
      schoolOrg: "all",
      age: "all",
      name: "all",
      ic: "all",
    });
  };

  const [more, setMore] = useState(false);
  const [name, setName] = useState(filters.name);
  const [ic, setIc] = useState(filters.ic);

  return (
    <div className="px-6 pt-8 mt-8 space-y-2 bg-white rounded-t-xl">
      <div className="flex gap-4">
        <SelectEvent
          onChange={onChangeHandler("event")}
          data={rawData}
          filters={filters}
        />
        <SelectSO
          onChange={onChangeHandler("schoolOrg")}
          data={rawData}
          filters={filters}
        />
        <SelectAge onChange={onChangeHandler("age")} filters={filters} />

        <div className="flex flex-col w-1/6">
          <label className="text-sm text-zinc-600">Name</label>
          <input
            type="text"
            name="name"
            className="capitalize filterInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/6">
          <label className="text-sm text-zinc-600">IC Number</label>
          <input
            type="text"
            name="ic"
            className="capitalize filterInput"
            value={ic}
            onChange={(e) => setIc(e.target.value)}
          />
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => clearFilter()}
          className="px-4 py-1 border rounded-md border-darkBlue hover:shadow-md hover:shadow-gray-100"
        >
          Clear
        </button>
        <button
          onClick={() => setFilters({ ...filters, name, ic })}
          className="px-4 py-1 text-white border rounded-md bg-mediumBlue hover:shadow-md border-darkBlue"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
