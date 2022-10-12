const SelectSO = ({ data, onChange, filters }) => {
  const options = [
    ...new Set(data.map((person) => person["School/Organisation"])),
  ];
  return (
    <div className="flex flex-col w-1/6">
      <label className="text-sm text-zinc-600">School/Organisation</label>
      <select
        name="event"
        className="filterInput"
        onChange={onChange}
        value={filters.schoolOrg}
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

export default SelectSO;
