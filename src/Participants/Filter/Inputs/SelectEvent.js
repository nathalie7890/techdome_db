import { filterBySchoolOrg } from "../../../api/participants";

const SelectEvent = ({ data, onChange, filters }) => {
  const options = [
    ...new Set(
      data.map((person) => person.Event.split(" ").slice(0, -1).join(" "))
    ), 
    
  ];

  return (
    <div className="flex flex-col w-1/5">
      <label className="text-sm text-zinc-600">Event</label>
      <select
        name="event"
        className="border rounded-md border-zinc-400"
        onChange={onChange}
        value={filters.event}
      >
        <option value="all">All</option>
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectEvent;
