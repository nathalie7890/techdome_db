import { useState } from "react";

const Filter = ({
  onNameFilter,
  onEventFilter,
  onIcFilter,
  onSchoolOrgFilter,
  onAgeFilter,
}) => {
  const [filter, setFilter] = useState({
    event: "",
    name: "",
    schoolOrg: "",
    age: "",
    ic: "",
  });

  const onChangeHandler = (field) => (e) => {
    const { value } = e.target;
    console.log(value)
    setFilter({ ...filter, [field]: value });

    switch (field) {
      case "name":
        onNameFilter(value);
        break;
      case "event":
        onEventFilter(value);
        break;
      case "schoolOrg":
        onSchoolOrgFilter(value);
        break;
      case "age":
        onAgeFilter(value);
        break;
      case "ic":
        onIcFilter(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center gap-6">
      <div className="flex flex-col">
        <label>Event</label>
        <input
          type="text"
          name="event"
          onChange={onChangeHandler("event")}
          value={filter.event}
        />
      </div>

      <div className="flex flex-col">
        <label>School / Organization</label>
        <input
          type="text"
          name="schoolOrg"
          onChange={onChangeHandler("schoolOrg")}
          value={filter.schoolOrg}
        />
      </div>
      <div className="flex flex-col">
        <label>Age</label>
        <select
          name="age"
          onChange={onChangeHandler('age')}
          value={filter.age}
        >
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
        />
      </div>
      <div className="flex flex-col">
        <label>IC Number</label>
        <input
          type="text"
          name="ic"
          onChange={onChangeHandler("ic")}
          value={filter.ic}
        />
      </div>
    </div>
  );
};

export default Filter;
