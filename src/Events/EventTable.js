import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import UploadEvent from "./UploadEvent";
import EditEvent from "./EditEvent";
import SortEvent from "./SortEvent";
import DeleteMany from "./DeleteMany";
import { AiOutlineEdit } from "react-icons/ai";
import { convertArrayToCSV } from "convert-array-to-csv";

export default function EventTable({
  data,
  setFilters,
  editOpen,
  setEditOpen,
  filters,
}) {

  const [selected, setSelected] = useState([]);
  const [editEvent, setEditEvent] = useState({ id: "", name: "" });
  const [deleteMany, setDeleteMany] = useState({ visible: false, data: "" });
  const [upload, setUpload] = useState({ visible: false });

  const selectOnChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect") {
        setSelected([]);
        data.map((event) =>
          setSelected((selected) => [
            ...selected,
            { id: event._id, parts: event.parts, name: event.name },
          ])
        );
      } else {
        setSelected([
          ...selected,
          { id: data._id, parts: data.parts, name: data.name },
        ]);
      }
    } else {
      if (name === "allSelect") setSelected([]);
      else {
        let temp = selected.filter((event) => event.id !== data._id);
        setSelected(temp);
      }
    }
  };

  const downloadHandler = (data) => {
    data.map((item) => {
      const csv = convertArrayToCSV(item.parts);

      const fileName = item.name;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", fileName + ".csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className="flex w-full">
      <div className={`${editOpen ? "w-3/4" : "w-full"} p-8`}>
        <h1 className="my-6 text-5xl font-semibold">Events</h1>
        <Search filters={filters} setFilters={setFilters} />
        <div className="p-6 space-y-6 bg-white rounded-t-lg">
          <div className="flex items-end justify-between">
            <SortEvent filters={filters} setFilters={setFilters} />
            <div className="space-x-2">
              <button
                onClick={() => setUpload({ visible: true })}
                className="px-4 py-1 text-white rounded-md bg-mediumBlue"
              >
                Upload
              </button>
              {selected.length > 0 ? (
                <>
                  <button
                    onClick={() => downloadHandler(selected)}
                    className="px-4 py-1 text-white bg-yellow-400 rounded-md"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setDeleteMany({ visible: true })}
                    className="px-4 py-1 text-white bg-red-500 rounded-md"
                  >
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`relative overflow-x-auto shadow-md rounded-b-lg bg-white`}
        >
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
                <th scope="col" className="px-6 py-3 text-right">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((event) => {
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
                        onChange={(e) => selectOnChange(e, event)}
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
                    <td className="px-6 py-4">
                      {event.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4">{event.uploadBy}</td>
                    <td className="px-6 py-4">{event.parts.length}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          setEditOpen(!editOpen);
                          setEditEvent({
                            id: event._id,
                            name: event.name,
                          });
                        }}
                      >
                        <AiOutlineEdit className="text-gray-500"/>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`${editOpen ? "w-1/4" : "hidden"} bg-mediumBlue rounded-lg`}
      >
        <EditEvent
          editEvent={editEvent}
          setEditEvent={setEditEvent}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
      </div>

      <DeleteMany
        deleteMany={deleteMany}
        setDeleteMany={setDeleteMany}
        data={selected}
      />
      <UploadEvent upload={upload} setUpload={setUpload} />
    </div>
  );
}
