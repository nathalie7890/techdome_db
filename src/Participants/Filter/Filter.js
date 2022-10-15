import { useState } from "react";
import { Tooltip } from "flowbite-react";

const Filter = ({
  rawData,
  setFilters,
  filters,
  displayData,
  setDisplayData,
}) => {
  const onChangeHandler = (field) => (e) => {
    const { value } = e.target;
    setFilters({ ...filters, [field]: value });
  };


  const [event, setEvent] = useState(filters.event);
  const [schoolOrg, setSchoolOrg] = useState(filters.schoolOrg);
  const [ageFrom, setAgeFrom] = useState(filters.ageFrom);
  const [ageTo, setAgeTo] = useState(filters.ageTo);
  const [name, setName] = useState(filters.name);
  const [ic, setIc] = useState(filters.ic);
  const [eventAlpha, setEventAlpha] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [ageSort, setAgeSort] = useState("");

  const sortEvent = (e) => {
    const { value } = e.target;
    if (value === "a") {
      setDisplayData((displayData) => [
        ...displayData.sort((a, b) => (a.Event > b.Event ? -1 : 1)),
      ]);
      setEventAlpha(value);
    }

    if (value === "z") {
      setDisplayData((displayData) => [
        ...displayData.sort((a, b) => (a.Event > b.Event ? 1 : -1)),
      ]);
      setEventAlpha(value);
    }

    if (value === "latest") {
      setDisplayData((displayData) => [
        ...displayData.sort((a, b) => a.Event.slice(-4) - b.Event.slice(-4)),
      ]);
      setEventYear(value);
    }
    if (value === "oldest") {
      setDisplayData((displayData) => [
        ...displayData.sort((a, b) => b.Event.slice(-4) - a.Event.slice(-4)),
      ]);
      setEventYear(value);
    }
  };
  const sortAge = (e) => {
    const { value } = e.target;
    if (value === "youngest") {
      setDisplayData((displayData) => [
        ...displayData.sort((a, b) => a.age - b.age),
      ]);
      setAgeSort(value);
    }
    if (value === "oldest") {
      setDisplayData((displayData) => [
        ...displayData.sort((a, b) => b.age - a.age),
      ]);
      setAgeSort(value);
    }
  };

  return (
    <div className="px-6 pt-8 mt-8 space-y-2 bg-white rounded-t-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFilters({
            ...filters,
            name,
            ic,
            event,
            schoolOrg,
            ageFrom,
            ageTo,
          });
        }}
      >
        <div className="flex space-x-1">
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">Event</label>
            <input
              type="text"
              name="event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="capitalize filterInput"
            />
          </div>
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">School/Organisation</label>
            <input
              type="text"
              name="school/org"
              value={schoolOrg}
              onChange={(e) => setSchoolOrg(e.target.value)}
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
              onChange={(e) => setAgeFrom(e.target.value)}
              className="capitalize filterInput"
            />
          </div>
          <div className="flex flex-col w-1/6">
            <label className="text-sm text-zinc-600">Age To:</label>
            <input
              type="number"
              max="100"
              name="ageTo"
              value={ageTo}
              onChange={(e) => setAgeTo(e.target.value)}
              className="capitalize filterInput"
            />
          </div>
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
        <div>
          <p className="italic text-blue-500">
            Do include space in your filters to ensure consistent result. E.g.
            "glo walk" instead of "glowalk". Letter case do not matter.
            <br />
            Hit "Enter" or click the "Search" button to filter data and "Clear"
            to reset filters.
          </p>
        </div>
        <div className="my-4">
          <div className="flex space-x-1 w-6/6">
            <div className="flex flex-col w-1/6">
              <label className="text-sm text-zinc-600">
                Sort Event Alpabetically
              </label>
              <select
                name="eventAlpha"
                value={eventAlpha}
                onChange={sortEvent}
                className="bg-gray-100 border-gray-600 filterInput"
              >
                <option value="">Select</option>
                <option value="a">A-Z</option>
                <option value="z">Z-A</option>
              </select>
            </div>
            <div className="flex flex-col w-1/6">
              <label className="text-sm text-zinc-600">
                Sort Event By Year
              </label>
              <select
                name="eventYear"
                value={eventYear}
                onChange={sortEvent}
                className="bg-gray-100 border-gray-600 filterInput"
              >
                <option value="">Select</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <div className="flex flex-col w-1/6">
              <label className="text-sm text-zinc-600">
                Sort Participant By Age
              </label>
              <select
                name="eventYear"
                value={ageSort}
                onChange={sortAge}
                className="bg-gray-100 border-gray-600 filterInput"
              >
                <option value="">Select</option>
                <option value="youngest">Youngest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <div>
            <p className="italic text-blue-500">
              Please note that these 3 filters correlate with the filters above.
              Data is filtered and displayed by clicking any option from the dropdown.
              <br />
            </p>
          </div>
        </div>
        <div className="space-x-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-1 border rounded-md border-darkBlue hover:shadow-md hover:bg-blue-500 hover:text-white"
          >
            Clear
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
