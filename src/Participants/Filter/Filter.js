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

  return (
    <div>
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
        <button onClick={() => clearFilter()}>Clear</button>
        <button onClick={() => setMore(!more)}>
          {!more ? "More" : "Less"}
        </button>
      </div>
      {more ? (
        <div className="flex gap-4">
          <SearchName onChange={onChangeHandler("name")} filters={filters} />
          <SearchIc onChange={onChangeHandler("ic")} filters={filters} />
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
