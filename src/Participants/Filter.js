import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { RiArrowUpDownFill } from "react-icons/ri";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { style } from "./styles/Filter.styles";

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
    <div className={style.mainContainer}>
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
        <div className={style.inputContainer}>
          <input
            type="text"
            name="schoolOrg"
            value={schoolOrg}
            onChange={onChangeHandler}
            placeholder="School/Organisation"
            className={style.input}
          />

          <div className={style.ageFromContainer}>
            <div className={style.ageFrom}>
              <h1 className="">Age</h1>
              <div className={style.ageRangeIconContainer}>
                <MdKeyboardArrowRight className="text-lg text-center" />
              </div>
            </div>
            <input
              type="number"
              min="0"
              name="ageFrom"
              value={ageFrom}
              onChange={onChangeHandler}
              className={style.ageInput}
            />
          </div>
          <div className={style.ageToContainer}>
            <div className={style.ageTo}>
              <h1 className="">Age</h1>
              <div className={style.ageRangeIconContainer}>
                <MdKeyboardArrowLeft className="text-lg text-center" />
              </div>
            </div>
            <input
              type="number"
              max="200"
              name="ageTo"
              value={ageTo}
              onChange={onChangeHandler}
              className={style.ageInput}
            />
          </div>

          <input
            type="text"
            name="name"
            className={style.input}
            value={name}
            placeholder="Name"
            onChange={onChangeHandler}
          />

          <input
            type="text"
            name="ic"
            className={style.input}
            value={ic}
            placeholder="IC Number"
            onChange={onChangeHandler}
          />

          {/* search */}
          <div className={style.searchContainer}>
            <button type="submit" className={style.searchBtn}>
              <span className="lg:hidden">Search</span>
              <BsSearch className="hidden lg:block" />
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={style.refreshBtn}
            >
              <span className="lg:hidden">Reset</span>
              <IoIosRefresh className="hidden lg:block" />
            </button>
          </div>
        </div>
        {/* end of search */}

        {/* name and age filter */}
        <div className="mt-10 space-x-2">
          <button onClick={sortName} className={style.nameAgeFilter}>
            <span className={style.nameAgeSpan}>
              Name
              <RiArrowUpDownFill />
            </span>
          </button>
          <button onClick={sortAge} className={style.nameAgeFilter}>
            <span className={style.nameAgeSpan}>
              Age
              <RiArrowUpDownFill />
            </span>
          </button>
        </div>
        {/* end of name and age filter */}
      </form>
    </div>
  );
};

export default Filter;
