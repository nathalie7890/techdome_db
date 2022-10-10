import { useState } from "react";
import {
  filterByEvent,
  filterBySchoolOrg,
  filterByAge,
  filterByName,
  filterByIC,
} from "../api/participants";

const Filter = ({ schoolOrgs, eventOptions, setData, setClearChecked, setFiltered }) => {
  const [filter, setFilter] = useState({
    event: "all",
    name: "",
    schoolOrg: "all",
    age: "all",
    ic: "",
  });

  //onsole.log(filter)
  const eventFilterHandler = async (event) => {
    const filteredData = await filterByEvent(
      event,
      filter.schoolOrg,
      filter.age
    );
    setData(filteredData);
    setFiltered(filteredData)
    setClearChecked(true);
  };

  const schoolOrgFilterHandler = async (schoolOrg) => {
    const filteredData = await filterBySchoolOrg(
      schoolOrg,
      filter.event,
      filter.age
    );
    setData(filteredData);
    setFiltered(filteredData)
    setClearChecked(true);
  };

  const ageFilterHandler = async (age) => {
    const filteredData = await filterByAge(age, filter.event, filter.schoolOrg);
    setData(filteredData);
    setFiltered(filteredData)
    setClearChecked(true);
  };

  const nameFilterHandler = async (name) => {
    const filteredData = await filterByName(
      name,
      filter.event,
      filter.schoolOrg,
      filter.age
    );
    setData(filteredData);
    setFiltered(filteredData)
    setClearChecked(true);
  };

  const icFilterHandler = async (ic) => {
    const filteredData = await filterByIC(
      ic,
      filter.event,
      filter.schoolOrg,
      filter.age
    );
    setData(filteredData);
    setFiltered(filteredData)
    setClearChecked(true);
  };

  const onChangeHandler = (field) => (e) => {
    const { value } = e.target;
    setFilter({ ...filter, [field]: value });

    switch (field) {
      case "name":
        nameFilterHandler(value);
        break;
      case "event":
        eventFilterHandler(value);
        break;
      case "schoolOrg":
        schoolOrgFilterHandler(value);
        break;
      case "age":
        ageFilterHandler(value);
        break;
      case "ic":
        icFilterHandler(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center gap-6 my-10">
      <div className="flex flex-col">
        <label>Event</label>
        <select
          name="event"
          onChange={onChangeHandler("event")}
          value={filter.event}
          className="rounded-md"
        >
          <option value="all">All</option>
          {eventOptions.map((eventOption, i) => (
            <option value={eventOption} key={i}>
              {eventOption}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label>School / Organization</label>
        <select
          name="schoolOrg"
          value={filter.schoolOrg}
          onChange={onChangeHandler("schoolOrg")}
          className="rounded-md"
        >
          <option value="all">All</option>
          {schoolOrgs.map((schoolOrg, i) => (
            <option value={schoolOrg} key={i}>
              {schoolOrg}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label>Age</label>
        <select
          name="age"
          onChange={onChangeHandler("age")}
          value={filter.age}
          className="rounded-md"
        >
          <option value="all">All</option>
          <option value="0">Below 10</option>
          <option value="10">10-19</option>
          <option value="20">20-29</option>
          <option value="30">30-39</option>
          <option value="40">40-49</option>
          <option value="50">50-59</option>
          <option value="60">60-69</option>
          <option value="70">70-79</option>
          <option value="80">80-89</option>
          <option value="90">90 and above</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={onChangeHandler("name")}
          value={filter.name}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label>IC Number</label>
        <input
          type="text"
          name="ic"
          onChange={onChangeHandler("ic")}
          value={filter.ic}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default Filter;
