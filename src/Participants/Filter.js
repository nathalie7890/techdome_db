import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { RiArrowUpDownFill } from "react-icons/ri";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { styles } from "./styles/Filter.styles";

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
    <div className={styles.mainContainer}>
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
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="schoolOrg"
            value={schoolOrg}
            onChange={onChangeHandler}
            placeholder="School/Organisation"
            className={styles.input}
          />

          <div className={styles.ageFromContainer}>
            <div className={styles.ageFrom}>
              <h1 className="">Age</h1>
              <div className={styles.ageRangeIconContainer}>
                <MdKeyboardArrowRight className="text-lg text-center" />
              </div>
            </div>
            <input
              type="number"
              min="0"
              name="ageFrom"
              value={ageFrom}
              onChange={onChangeHandler}
              className={styles.ageInput}
            />
          </div>
          <div className={styles.ageToContainer}>
            <div className={styles.ageTo}>
              <h1 className="">Age</h1>
              <div className={styles.ageRangeIconContainer}>
                <MdKeyboardArrowLeft className="text-lg text-center" />
              </div>
            </div>
            <input
              type="number"
              max="200"
              name="ageTo"
              value={ageTo}
              onChange={onChangeHandler}
              className={styles.ageInput}
            />
          </div>

          <input
            type="text"
            name="name"
            className={styles.input}
            value={name}
            placeholder="Name"
            onChange={onChangeHandler}
          />

          <input
            type="text"
            name="ic"
            className={styles.input}
            value={ic}
            placeholder="IC Number"
            onChange={onChangeHandler}
          />

          {/* search */}
          <div className={styles.searchContainer}>
            <button type="submit" className={styles.searchBtn}>
              <span className="lg:hidden">Search</span>
              <BsSearch className="hidden lg:block" />
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={styles.refreshBtn}
            >
              <span className="lg:hidden">Reset</span>
              <IoIosRefresh className="hidden lg:block" />
            </button>
          </div>
        </div>
        {/* end of search */}

        {/* name and age filter */}
        <div className="mt-10 space-x-2">
          <button onClick={sortName} className={styles.nameAgeFilter}>
            <span className={styles.nameAgeSpan}>
              Name
              <RiArrowUpDownFill />
            </span>
          </button>
          <button onClick={sortAge} className={styles.nameAgeFilter}>
            <span className={styles.nameAgeSpan}>
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
