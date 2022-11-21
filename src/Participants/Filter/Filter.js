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

  return (
    <div className="pt-8 mt-8 space-y-2 rounded-t-xl">
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
        <div className="flex flex-col gap-2 mb-4 md:flex-row md:flex-wrap">
          <input
            type="text"
            name="schoolOrg"
            value={schoolOrg}
            onChange={onChangeHandler}
            placeholder="School/Organisation"
            className="capitalize border border-gray-300 rounded-full focus:border-blue-300 focus:ring-blue-300"
          />

          <div className="flex text-gray-500 border border-gray-300 rounded-full md:w-1/6">
            <div className="flex items-center px-4 rounded-l-full md:w-1/2 md:text-center">
              <h1 className="">Age</h1>
              <div className="flex flex-col items-center justify-center h-full">
                <MdKeyboardArrowRight className="text-lg text-center" />
              </div>
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
          <div className="flex text-gray-500 border border-gray-300 rounded-full md:w-1/6">
            <div className="flex items-center px-4 rounded-l-full md:text-center md:w-1/2">
              <h1 className="">Age</h1>
              <div className="flex flex-col items-center justify-center h-full">
                <MdKeyboardArrowLeft className="text-lg text-center" />
              </div>
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
            className="capitalize border border-gray-300 rounded-full focus:border-blue-300 focus:ring-blue-300"
            value={name}
            placeholder="Name"
            onChange={onChangeHandler}
          />

          <input
            type="text"
            name="ic"
            className="capitalize border border-gray-300 rounded-full focus:border-blue-300 focus:ring-blue-300"
            value={ic}
            placeholder="IC Number"
            onChange={onChangeHandler}
          />

          <div className="flex space-x-2">
            <button
              type="submit"
              className="lg:px-3.5 px-8 lg:py-3.5 py-2 text-white bg-purple-500 border rounded-full hover:shadow-md hover:bg-purple-600 drop-shadow-[0_3px_7px_rgba(0,0,0,0.1)]"
            >
              <span className="lg:hidden">Search</span>
              <BsSearch className="hidden lg:block" />
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="lg:px-3.5 px-8  lg:py-3.5 py-2 text-white bg-blue-500 border rounded-full hover:shadow-md hover:bg-blue-600 drop-shadow-[0_3px_7px_rgba(0,0,0,0.1)]"
            >
              <span className="lg:hidden">Reset</span>
              <IoIosRefresh className="hidden lg:block" />
            </button>
          </div>
        </div>

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
            className="font-semibold text-white bg-blue-400 border-2 border-blue-400 rounded-full hover:bg-blue-500"
          >
            <span className="flex items-center justify-center gap-1 px-6 py-1">
              Age
              <RiArrowUpDownFill />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
