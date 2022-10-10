export default function SelectAge({ onChange, filters }) {
  return (
    <div className="flex flex-col w-1/5">
      <label className="text-sm text-zinc-600">Age</label>
      <select
        name="event"
        className="border rounded-md border-zinc-400"
        onChange={onChange}
        value={filters.age}
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
  );
}
