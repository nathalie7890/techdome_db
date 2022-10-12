import {useState} from "react";

export default function SearchName({ onChange, filters }) {
const [name, setName] = useState(filters.name)
console.log(name)
  return (
    <div className="flex flex-col w-1/5">
      <label className="text-sm text-zinc-600">Name</label>
      <input
        type="text"
        name="name"
        className="rounded-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
