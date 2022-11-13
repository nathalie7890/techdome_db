import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { RiArrowUpDownFill } from "react-icons/ri";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Filter = ({ setFilters, filters }) => {
  const [filter, setFilter] = useState({
    event: filters.event,
    schoolOrg: filters.schoolOrg,
    ageFrom: filters.ageFrom,
    ageTo: filters.ageTo,
    name: filters.name,
    ic: filters.ic,
  });

  const { event, schoolOrg, ageFrom, ageTo, name, ic } = filter;

  const onChangeHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value.toLowerCase() });
  };

  const sortAge = () => {
    if (filters.ageSort === "asc") {
      setFilters({
        ...filters,
        ageSort: "dsc",
        nameSort: "",
      });
    } else {
      setFilters({
        ...filters,
        ageSort: "asc",
        nameSort: "",
      });
    }
  };

  const sortName = () => {
    if (filters.nameSort === "asc") {
      setFilters({
        ...filters,
        ageSort: "",
        nameSort: "dsc",
      });
    } else {
      setFilters({
        ...filters,
        ageSort: "",
        nameSort: "asc",
      });
    }
  };

  // const sortOnChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "ageSort") {
  //     if (value === "asc") {
  //       setFilters({
  //         ...filters,
  //         eventAlpha: "",
  //         eventYear: "",
  //         ageSort: "asc",
  //       });
  //     } else if (value === "dsc") {
  //       setFilters({
  //         ...filters,
  //         eventAlpha: "",
  //         eventYear: "",
  //         ageSort: "dsc",
  //       });
  //     }
  //   }
  // };

  return (
    <div className="pt-8 mt-8 space-y-2 bg-white rounded-t-xl">
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
          <input
            type="text"
            name="schoolOrg"
            value={schoolOrg}
            onChange={onChangeHandler}
            placeholder="School/Organisation"
            className="w-1/6 capitalize border border-gray-300 rounded-full focus:border-blue-300 focus:ring-blue-300"
          />

          <div className="flex w-1/6 text-gray-500 border border-gray-300 rounded-full">
            <div className="flex items-center justify-center w-1/2 text-sm font-semibold text-center rounded-l-full">
              <h1 className="">Age</h1>
              <MdKeyboardArrowRight className="flex items-center justify-center text-lg text-center" />
            </div>
            <input
              type="number"
              min="0"
              name="ageFrom"
              value={ageFrom}
              onChange={onChangeHandler}
              className="w-1/2 capitalize border-0 rounded-full focus:border-0 focus:ring-0"
            />
          </div>
          <div className="flex w-1/6 text-gray-500 border border-gray-300 rounded-full">
            <div className="flex items-center justify-center w-1/2 text-sm font-semibold text-center rounded-l-full">
              <h1 className="">Age</h1>
              <MdKeyboardArrowLeft className="flex items-center justify-center text-lg text-center" />
            </div>
            <input
              type="number"
              max="200"
              name="ageTo"
              value={ageTo}
              onChange={onChangeHandler}
              className="w-1/2 border-0 rounded-full focus:border-0 focus:ring-0"
            />
          </div>

          <input
            type="text"
            name="name"
            className="w-1/6 border border-gray-300 rounded-full apitalize focus:border-blue-300 focus:ring-blue-300"
            value={name}
            placeholder="Name"
            onChange={onChangeHandler}
          />

          <input
            type="text"
            name="ic"
            className="w-1/6 border border-gray-300 rounded-full apitalize focus:border-blue-300 focus:ring-blue-300"
            value={ic}
            placeholder="IC Number"
            onChange={onChangeHandler}
          />

          <button
            type="submit"
            className="px-3.5 py-3.5 text-white bg-purple-500 border rounded-full hover:shadow-md hover:bg-purple-600 drop-shadow-[0_3px_7px_rgba(0,0,0,0.1)]"
          >
            <BsSearch />
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-3.5 py-3.5 text-white bg-blue-500 border rounded-full hover:shadow-md hover:bg-blue-600 drop-shadow-[0_3px_7px_rgba(0,0,0,0.1)]"
          >
            <IoIosRefresh />
          </button>
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
            onClick={sortName}
            className="font-semibold text-blue-400 border-2 border-blue-400 rounded-full hover:bg-blue-400 hover:text-white "
          >
            <span className="flex items-center justify-center gap-1 px-6 py-1">
              Name
              <RiArrowUpDownFill />
            </span>
          </button>
          <button
            onClick={sortAge}
            className="font-semibold text-white bg-blue-400 border-2 border-blue-400 rounded-full hover:bg-blue-500 "
          >
            <span className="flex items-center justify-center gap-1 px-6 py-1">
              Age
              <RiArrowUpDownFill />
            </span>
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default Filter;
