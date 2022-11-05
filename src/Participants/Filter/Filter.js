import { useState } from "react";

const Filter = ({ setFilters, filters }) => {
  const [filter, setFilter] = useState({
    event: filters.event,
    schoolOrg: filters.schoolOrg,
    ageFrom: filters.ageFrom,
    ageTo: filters.ageTo,
    name: filters.name,
    ic: filters.ic,
  });

  const { ageSort } = filters;
  const { event, schoolOrg, ageFrom, ageTo, name, ic } = filter;

  const onChangeHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value.toLowerCase() });
  };

  const sortOnChange = (e) => {
    const { name, value } = e.target;
   
    if (name === "ageSort") {
      if (value === "asc") {
        setFilters({
          ...filters,
          eventAlpha: "",
          eventYear: "",
          ageSort: "asc",
        });
      } else if (value === "dsc") {
        setFilters({
          ...filters,
          eventAlpha: "",
          eventYear: "",
          ageSort: "dsc",
        });
      }
    }
  };

  return (
    <div className="px-6 pt-8 mt-8 space-y-2 bg-white rounded-t-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFilters({
            ...filters,
            event,
            schoolOrg,
            ageFrom,
            ageTo,
            name,
            ic,
          });
        }}
      >
        <div className="flex w-5/6 mb-4 space-x-1">
          {/* <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">Event</label>
            <input
              type="text"
              name="event"
              value={event}
              onChange={onChangeHandler}
              className="capitalize filterInput"
            />
          </div> */}
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">School/Organisation</label>
            <input
              type="text"
              name="schoolOrg"
              value={schoolOrg}
              onChange={onChangeHandler}
              className="capitalize filterInput"
            />
          </div>
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">Age From:</label>
            <input
              type="number"
              min="0"
              name="ageFrom"
              value={ageFrom}
              onChange={onChangeHandler}
              className="capitalize filterInput"
            />
          </div>
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">Age To:</label>
            <input
              type="number"
              max="200"
              name="ageTo"
              value={ageTo}
              onChange={onChangeHandler}
              className="capitalize filterInput"
            />
          </div>
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">
              Sort By Age
            </label>
            <select
              name="ageSort"
              value={ageSort}
              onChange={sortOnChange}
              className="filterInput"
            >
              <option value="">Select</option>
              <option value="asc">Youngest</option>
              <option value="dsc">Oldest</option>
            </select>
          </div>
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">Name</label>
            <input
              type="text"
              name="name"
              className="capitalize filterInput"
              value={name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">IC Number</label>
            <input
              type="text"
              name="ic"
              className="capitalize filterInput"
              value={ic}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        {/* <div className="my-4">
          <div className="flex space-x-1 w-6/6">
            <div className="flex flex-col w-1/6">
              <label className="text-sm text-zinc-600">
                Sort Event Alpabetically
              </label>
              <select
                name="eventAlpha"
                value={eventAlpha}
                onChange={sortOnChange}
                className="bg-gray-100 border-gray-600 filterInput"
              >
                <option value="">Select</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
              </select>
            </div>
            <div className="flex flex-col w-1/6">
              <label className="text-sm text-zinc-600">
                Sort Event By Year
              </label>
              <select
                name="eventYear"
                value={eventYear}
                onChange={sortOnChange}
                className="bg-gray-100 border-gray-600 filterInput"
              >
                <option value="">Select</option>
                <option value="asc">Latest</option>
                <option value="dsc">Oldest</option>
              </select>
            </div>
            <div className="flex flex-col w-1/6">
              <label className="text-sm text-zinc-600">
                Sort Participant By Age
              </label>
              <select
                name="ageSort"
                value={ageSort}
                onChange={sortOnChange}
                className="bg-gray-100 border-gray-600 filterInput"
              >
                <option value="">Select</option>
                <option value="asc">Youngest</option>
                <option value="dsc">Oldest</option>
              </select>
            </div>
          </div>
        </div> */}
        <div className="space-x-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-1 border rounded-md border-darkBlue hover:shadow-md hover:bg-blue-500 hover:text-white"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-white border rounded-md bg-mediumBlue hover:shadow-md border-darkBlue hover:bg-blue-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
