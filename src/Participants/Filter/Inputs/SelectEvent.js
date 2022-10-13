
const SelectEvent = ({ data, onChange, filters }) => {
  const options = [
    ...new Set(
      data.map((person) => person.Event.split(" ").slice(0, -1).join(" "))
    ),
  ];

  return (
    <div className="flex flex-col w-1/6">
      <label className="text-sm text-zinc-600">EVENT</label>
      <select
        name="event"
        className="filterInput"
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
