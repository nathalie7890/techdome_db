import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function EventTable({ data, setSearch }) {
  const [selected, setSelected] = useState([]);

  const selectOnChange = (e, id) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect") {
        setSelected([]);
        data.map((event) =>
          setSelected((selected) => [...selected, { id: event._id }])
        );
      } else {
        console.log(name);
        setSelected([...selected, { id }]);
      }
    } else {
      if (name === "allSelect") setSelected([]);
      else {
        let temp = selected.filter((event) => event.id !== id);
        setSelected(temp);
      }
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Search setSearch={setSearch} />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <input
                type="checkbox"
                name="allSelect"
                checked={selected.length === data.length}
                onChange={(e) => selectOnChange(e, data)}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              Event
            </th>
            <th scope="col" className="px-6 py-3">
              Upload Date
            </th>
            <th scope="col" className="px-6 py-3">
              Upload By
            </th>
            <th scope="col" className="px-6 py-3">
              Participants
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length <= 0 ? (
            <>No events</>
          ) : (
            data.map((event) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={event._id}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name="singleSelect"
                      checked={selected.some((e) => e?.id === event._id)}
                      onChange={(e) => selectOnChange(e, event._id)}
                    />
                  </td>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link to={"/participants"} state={{ event: event.name }}>
                      {event.name}
                    </Link>
                  </th>
                  <td className="px-6 py-4">{event.createdAt.slice(0, 10)}</td>
                  <td className="px-6 py-4">{event.uploadBy}</td>
                  <td className="px-6 py-4">{event.parts.length}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="."
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
