import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import UploadEvent from "./UploadEvent";
import EditEvent from "./EditEvent";
import SortEvent from "./SortEvent";
import DeleteMany from "./DeleteMany";
import { convertArrayToCSV } from "convert-array-to-csv";
import no_result from "../public/images/spaceguy.gif";
import { AiOutlineEdit } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";
import { checkAuth } from "../api/users";

export default function EventTable({
  data,
  setFilters,
  editOpen,
  setEditOpen,
  filters,
}) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  function getWindowSize() {
    return window.innerHeight;
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowHeight(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const [selected, setSelected] = useState([]);
  const [editEvent, setEditEvent] = useState({ id: "", name: "" });
  const [deleteMany, setDeleteMany] = useState({ visible: false, data: "" });
  const [upload, setUpload] = useState({ visible: false });

  const { isAdmin } = checkAuth();
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
    <div className="flex w-full min-h-screen">
      <div className={`${editOpen.visible ? "w-3/4" : "w-full"} p-8`}>
        <h1 className="mb-8 text-4xl font-semibold text-blue-400 sm:text-5xl">Events</h1>
        <Search filters={filters} setFilters={setFilters} />
        <div className="py-6 space-y-6 bg-white rounded-t-lg">
          <div className="flex items-end justify-start sm:justify-between">
            <SortEvent filters={filters} setFilters={setFilters} />

            <div className="hidden space-x-4 md:block">
              {isAdmin ? (
                <button
                  className="px-3 py-3 text-center bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
                  onClick={() => setUpload({ visible: true })}
                >
                  <IoAdd className="text-lg font-bold text-white" />
                </button>
              ) : null}

              {selected.length > 0 ? (
                <>
                  <button
                    className="px-3 py-3 bg-purple-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-purple-600 border border-gray-400"
                    onClick={() => downloadHandler(selected)}
                  >
                    <BsDownload className="text-white" />
                  </button>
                  {isAdmin ? (
                    <button
                      className="px-3 py-3 bg-red-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-red-600 border border-gray-400"
                      onClick={() => setDeleteMany({ visible: true })}
                    >
                      <FiTrash2 className="text-white" />
                    </button>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex mb-2">
          <h1>Showing {data.length} result</h1>
          <h1 className="mx-4 italic font-medium text-blue-600">
            {selected.length > 0 ? `${selected.length} selected` : null}
          </h1>
        </div>
        <div
          className={`relative overflow-x-auto shadow-md rounded-b-lg bg-white max-w-full`}
        >
          {data.length <= 0 ? (
            <div className="flex flex-col items-center justify-center p-12 font-semibold text-center border rounded-tr-md border-t-lightBlue rounded-tl-md">
              <img src={no_result} alt="" className="h-80" />
              <h1 className="text-xl text-blue-500">No result :( </h1>
              <p>Maybe try searching with different keyword instead?</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                <tr>
                  <th
                    scope="col"
                    className={`hidden px-6 py-3 ${
                      windowHeight < 500 ? "hidden" : "sm:block"
                    }`}
                  >
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
                    Year
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
                  {isAdmin ? (
                    <th
                      scope="col"
                      className={`hidden px-6 py-3 text-right ${
                        windowHeight < 500 ? "hidden" : "sm:block"
                      }`}
                    >
                      Edit
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data.map((event) => {
                  return (
                    <tr
                      className="border-b odd:bg-white hover:bg-gray-100 even:bg-gray-50"
                      key={event._id}
                    >
                      <td
                        className={`hidden px-6 py-4 ${
                          windowHeight < 500 ? "hidden" : "sm:block"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="singleSelect"
                          checked={selected.some((e) => e?.id === event._id)}
                          onChange={(e) => selectOnChange(e, event)}
                        />
                      </td>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-normal"
                      >
                        <Link
                          to={"/participants"}
                          state={{ event: event.name }}
                        >
                          {event.name}
                        </Link>
                      </th>
                      <td className="px-6 py-4 md:break-all">
                        {event.name.slice(-4)}
                      </td>
                      <td className="px-6 py-4 md:break-all">
                        {event.createdAt.slice(0, 10)}
                      </td>
                      <td className="px-6 py-4 md:break-all">
                        {event.uploadBy}
                      </td>
                      <td className="px-6 py-4 md:break-all">
                        {event.parts.length}
                      </td>
                      {isAdmin ? (
                        <td
                          className={`hidden px-6 py-4 text-right md:break-all ${
                            windowHeight < 500 ? "hidden" : "sm:block"
                          }`}
                        >
                          <button
                            className="font-medium text-blue-600 hover:underline"
                            onClick={() => {
                              setEditOpen({ visible: true });
                              setEditEvent({
                                id: event._id,
                                name: event.name,
                              });
                            }}
                          >
                            <AiOutlineEdit className="text-gray-500" />
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div
        className={`${
          editOpen.visible ? "w-1/4" : "hidden"
        } bg-gradient-to-br from-[#3f51b5]  to-purple-500 shadow-lg `}
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
        setSelected={setSelected}
      />
      <UploadEvent upload={upload} setUpload={setUpload} />
    </div>
  );
}
