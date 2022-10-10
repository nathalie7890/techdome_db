const SelectSO = ({ data, onChange, filters }) => {
  const options = [
    ...new Set(data.map((person) => person["School/Organisation"])),
  ];
  return (
    <div className="flex flex-col w-1/5">
      <label className="text-sm text-zinc-600">School/Organisation</label>
      <select
        name="event"
        className="border rounded-md border-zinc-400"
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
