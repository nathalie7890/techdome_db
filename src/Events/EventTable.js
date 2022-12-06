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
import { FiTrash2, FiPlus, FiDownload } from "react-icons/fi";
import { checkAuth } from "../api/users";
import { styles } from "./styles/EventTable.styles";

export default function EventTable({
  data,
  setFilters,
  editOpen,
  setEditOpen,
  filters,
}) {
  const { isAdmin } = checkAuth();

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
    <div className={styles.mainContainer}>
      <div className={`${editOpen.visible ? "w-3/4" : "w-full"} p-8`}>
        <h1 className={styles.pageTitle}>Events</h1>
        <Search filters={filters} setFilters={setFilters} />

        {/* Sort, Add, Delete */}
        <div className={styles.sortContainer}>
          <div className={styles.sortInnerContainer}>
            <SortEvent filters={filters} setFilters={setFilters} />

            <div className="hidden space-x-4 md:block">
              {isAdmin ? (
                <button
                  className={styles.addBtn}
                  onClick={() => setUpload({ visible: true })}
                >
                  <FiPlus className="text-white" />
                </button>
              ) : null}

              {selected.length > 0 ? (
                <>
                  <button
                    className={styles.downloadBtn}
                    onClick={() => downloadHandler(selected)}
                  >
                    <FiDownload className="text-white" />
                  </button>
                  {isAdmin ? (
                    <button
                      className={styles.deleteBtn}
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
        {/* End of Sort, Add, Delete */}

        {/* event length and selected event */}
        <div className="flex gap-4 mb-2">
          <h1>Showing {data.length} result</h1>
          <h1 className="italic font-medium text-blue-600">
            {selected.length > 0 ? `${selected.length} selected` : null}
          </h1>
        </div>
        {/* end of event length and selected event */}

        {/* event table */}
        <div className={styles.tableContainer}>
          {data.length <= 0 ? (
            <div className={styles.noResult}>
              <img src={no_result} alt="" className="h-80" />
              <h1 className="text-xl text-blue-500">No result :( </h1>
              <p>Maybe try searching with different keyword instead?</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead className={styles.tHead}>
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
                      className={`${styles.tr} ${
                        selected.some((e) => e?.id === event._id)
                          ? "bg-blue-100"
                          : "odd:bg-white even:bg-gray-50"
                      }`}
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

                      <th scope="row" className={styles.th}>
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
                            className={styles.editBtn}
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
        {/* end of event table */}
      </div>

      {/* right drawer edit event */}
      <div
        className={`${editOpen.visible ? "w-1/4" : "hidden"} ${
          styles.rightDrawer
        } `}
      >
        <EditEvent
          editEvent={editEvent}
          setEditEvent={setEditEvent}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
      </div>
      {/* end of right drawer edit event */}

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
