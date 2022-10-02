import { useState } from "react";
import { Participants } from "../sampleData";
const Filter = ({ schoolOrgs, eventOptions, setData }) => {
  const [filter, setFilter] = useState({
    event: "",
    name: "",
    schoolOrg: "",
    age: "all",
    ic: "",
  });


  const eventFilterHandler = (event) => {
    const filterData = Participants.filter((participant) => {
      if (event == "")
        return (
          Participants &&
          (filter.schoolOrg.length > 0
            ? participant["School/Organisation"] == filter.schoolOrg
            : true) &&
          (filter.age == 0 ? participant.age < 10 : true) &&
          (filter.age > 0
            ? participant.age >= parseInt(filter.age) &&
              participant.age <= parseInt(filter.age) + 9
            : true) && (filter.age == "all" ? participant: true)
        );
      else
        return (
          participant.Event.toLowerCase().includes(event.toLowerCase()) &&
          (filter.schoolOrg.length > 0
            ? participant["School/Organisation"] == filter.schoolOrg
            : true) &&
          (filter.age == 0 ? participant.age < 10 : true) &&
          (filter.age > 0
            ? participant.age >= parseInt(filter.age) &&
              participant.age <= parseInt(filter.age) + 9
            : true)  && (filter.age == "all" ? participant: true)
        );
    });

    setData(filterData);
  };

  const schoolOrgFilterHandler = (schoolOrg) => {
    const filterData = Participants.filter((participant) => {
      if (schoolOrg == "")
        return (
          Participants &&
          (filter.event.length > 0
            ? participant.Event.toLowerCase().includes(
                filter.event.toLowerCase()
              )
            : true) &&
          (filter.age == 0 ? participant.age < 10 : true) &&
          (filter.age > 0
            ? participant.age >= parseInt(filter.age) &&
              participant.age <= parseInt(filter.age) + 9
            : true) && (filter.age == "all" ? participant: true)
        );
      else
        return (
          participant["School/Organisation"] == schoolOrg &&
          (filter.event.length > 0
            ? participant.Event.toLowerCase().includes(
                filter.event.toLowerCase()
              )
            : true) &&
          (filter.age == 0 ? participant.age < 10 : true) &&
          (filter.age > 0
            ? participant.age >= parseInt(filter.age) &&
              participant.age <= parseInt(filter.age) + 9
            : true) && (filter.age == "all" ? participant: true)
        );
    });

    setData(filterData);
  };

  const ageFilterHandler = (age) => {
    const filterData = Participants.filter((participant) => {
      if (age == "all")
        return (
          Participants &&
          (filter.event.length > 0
            ? participant.Event.toLowerCase().includes(
                filter.event.toLowerCase()
              )
            : true) &&
          (filter.schoolOrg.length > 0
            ? participant["School/Organisation"] == filter.schoolOrg
            : true)
        );
      if (age == 0)
        return (
          participant.age < 10 &&
          (filter.event.length > 0
            ? participant.Event.toLowerCase().includes(
                filter.event.toLowerCase()
              )
            : true) &&
          (filter.schoolOrg.length > 0
            ? participant["School/Organisation"] == filter.schoolOrg
            : true)
        );
      else
        return (
          participant.age >= parseInt(age) &&
          participant.age <= parseInt(age) + 9 &&
          (filter.event.length > 0
            ? participant.Event.toLowerCase().includes(
                filter.event.toLowerCase()
              )
            : true) &&
          (filter.schoolOrg.length > 0
            ? participant["School/Organisation"] == filter.schoolOrg
            : true)
        );
    });

    setData(filterData);
  };

  const nameFilterHandler = (name) => {
    const filterData = Participants.filter((participant) => {
      if (participant.Name.toLowerCase().includes(name.toLowerCase())) {
        return participant &&  (filter.event.length > 0
          ? participant.Event.toLowerCase().includes(
              filter.event.toLowerCase()
            )
          : true) &&
        (filter.schoolOrg.length > 0
          ? participant["School/Organisation"] == filter.schoolOrg
          : true)
      }
    });

    setData(filterData);
  };

  const icFilterHandler = (ic) => {
    const filterData = Participants.filter((participant) => {
      if (participant["IC Number"].toString().includes(ic)) {
        return participant &&  (filter.event.length > 0
          ? participant.Event.toLowerCase().includes(
              filter.event.toLowerCase()
            )
          : true) &&
        (filter.schoolOrg.length > 0
          ? participant["School/Organisation"] == filter.schoolOrg
          : true)
      }
    });

    setData(filterData);
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
          <option value="">All</option>
          {eventOptions.map((eventOption, i) => (
            <option value={eventOption} key={i}>
              {eventOption}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label>School / Organization</label>
        <select name="schoolOrg" onChange={onChangeHandler("schoolOrg")} className="rounded-md">
          <option value="">All </option>
          {schoolOrgs.map((schoolOrg, i) => (
            <option value={schoolOrg} key={i}>
              {schoolOrg}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label>Age</label>
        <select name="age" onChange={onChangeHandler("age")} value={filter.age} className="rounded-md">
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
