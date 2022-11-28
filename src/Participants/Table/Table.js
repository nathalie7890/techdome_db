import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import Filter from "../Filter/Filter";
import AddPart from "../AddPart";
import DeleteMany from "./DeleteMany";
import { checkAuth } from "../../api/users";
import EditParticipant from "../EditParticipant";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import no_result from "../../public/images/spaceguy.gif";

const Table = ({ data, rawData, setFilters, filters, event }) => {
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

  const { isAdmin } = checkAuth();
  const [selected, setSelected] = useState([]);
  const [fileName, setFileName] = useState("participants.csv");

  const [addPart, setAddPart] = useState({
    visible: false,
    name: event,
  });

  const [deleteMany, setDeleteMany] = useState({
    visible: false,
    selected: [],
    event: "",
  });

  const [edit, setEdit] = useState({
    visible: false,
    id: "",
    name: "",
    schoolOrg: "",
    age: "",
    ic: "",
    contact: "",
    email: "",
    address: "",
  });

  const handleChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect") {
        setSelected([]);
        data.map((person) => setSelected((selected) => [...selected, person]));
      } else {
        setSelected([...selected, data]);
      }
    } else {
      if (name === "allSelect") setSelected([]);
      else {
        let tempuser = selected.filter((person) => person._id !== data._id);
        setSelected(tempuser);
      }
    }
  };

  const downloadHandler = (e, done) => {
    let filename = prompt("Please enter file name:");
    if (filename === null) {
      done(false);
    } else {
      setFileName(filename);
      done();
    }
  };

  const editOnChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex md:w-[calc(100vw-80px)] w-[calc(100vw-1px)]">
      <div
        className={`px-8 md:px-12 py-8 bg-white ${
          edit.visible ? "w-3/4" : "w-full"
        }`}
      >
        <h1 className="text-2xl font-semibold text-blue-400 sm:text-5xl sm:my-6">
          {event}
        </h1>
        <Filter rawData={rawData} setFilters={setFilters} filters={filters} />
        <div className="flex items-end justify-between pb-2 bg-white">
          <div className="flex">
            <h1>Showing {data.length} result</h1>
            <h1 className="mx-4 italic font-medium text-blue-600">
              {selected.length > 0 ? `${selected.length} selected` : null}
            </h1>
          </div>
          <div className="flex gap-4 mb-8">
            <button
              className="hidden px-3 py-3 text-center bg-blue-500 rounded-full shadow-md md:block hover:bg-blue-600"
              onClick={() => setAddPart({ ...addPart, visible: true })}
            >
              <IoAdd className="text-lg font-bold text-white" />
            </button>
            {selected.length > 0 ? (
              <>
                <CSVLink
                  data={selected}
                  onClick={downloadHandler}
                  asyncOnClick={true}
                  filename={`${fileName}`}
                  className="px-3.5 py-3.5 bg-purple-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-purple-600 border border-gray-400"
                >
                  {" "}
                  <BsDownload className="text-white" />
                </CSVLink>{" "}
                {isAdmin ? (
                  <button
                    onClick={() =>
                      setDeleteMany({ visible: true, selected, event })
                    }
                    className="px-3.5 py-3.5 bg-red-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-red-600 border border-gray-400"
                  >
                    <FiTrash2 className="text-white" />
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
        <div className="max-w-full overflow-x-auto border-t rounded-t-lg rounded-b-lg shadow-md">
          {data.length <= 0 ? (
            <div className="flex flex-col items-center justify-center p-12 font-semibold text-center border rounded-tr-md border-t-lightBlue rounded-tl-md">
              <img src={no_result} alt="" className="h-80" />
              <h1 className="text-xl text-blue-500">No result :( </h1>
              <p>Maybe try searching with different keyword instead?</p>
            </div>
          ) : (
            <table className="max-w-full text-sm text-left text-gray-500 bg-white">
              <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                <tr>
                  <th
                    scope="col"
                    className={`hidden px-6 py-3 ${
                      windowHeight < 500 ? "hidden" : "sm:block"
                    }`}
                  >
                    {data.length > 0 ? (
                      <input
                        type="checkbox"
                        name="allSelect"
                        checked={selected.length === data.length}
                        onChange={(e) => handleChange(e, data)}
                      />
                    ) : null}
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    School/Organisation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    IC Number
                  </th>
                  {!edit.visible ? (
                    <>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Contact Number
                      </th>
                    </>
                  ) : null}
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                  {isAdmin ? (
                    <th
                      scope="col"
                      className={`hidden px-6 py-3 ${
                        windowHeight < 500 ? "hidden" : "sm:block"
                      }`}
                    >
                      Edit
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.length <= 0 ? (
                  <tr>
                    <td></td>
                    <td>
                      <h1 className="w-full py-4 text-3xl">No Participant</h1>
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((person) => {
                      return (
                        <tr
                          className="border-b odd:bg-white hover:bg-gray-100 even:bg-gray-50"
                          key={person._id}
                        >
                          <td
                            className={`hidden px-6 py-4 ${
                              windowHeight < 500 ? "hidden" : "sm:block"
                            }`}
                          >
                            <input
                              key={person._id}
                              type="checkbox"
                              name={person._id}
                              checked={selected.some(
                                (item) => item?._id === person._id
                              )}
                              onChange={(e) => handleChange(e, person)}
                            />
                          </td>

                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-normal"
                          >
                            {event}
                          </th>
                          <td className="px-6 py-4 md:break-all">
                            {person.name}
                          </td>
                          <td className="px-6 py-4 md:break-all">
                            {person.schoolOrg}
                          </td>
                          <td className="px-6 py-4 md:break-all">
                            {person.ic}
                          </td>
                          {!edit.visible ? (
                            <>
                              <td className="px-6 py-4 md:break-all">
                                {person.email}
                              </td>
                              <td className="px-6 py-4 md:break-all">
                                {person.contact}
                              </td>
                            </>
                          ) : null}
                          <td className="px-6 py-4 md:break-all">
                            {person.age}
                          </td>
                          {isAdmin ? (
                            <td
                              className={`hidden px-6 py-4 ${
                                windowHeight < 500 ? "hidden" : "sm:block"
                              }`}
                            >
                              <button
                                onClick={() =>
                                  setEdit({
                                    visible: true,
                                    id: person._id,
                                    name: person.name,
                                    schoolOrg: person.schoolOrg,
                                    age: person.age,
                                    ic: person.ic,
                                    contact: person.contact,
                                    email: person.email,
                                    address: person.address,
                                  })
                                }
                              >
                                <AiOutlineEdit />
                              </button>
                            </td>
                          ) : null}
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          )}

          <DeleteMany
            data={deleteMany}
            setDeleteMany={setDeleteMany}
            setSelected={setSelected}
          />
        </div>
      </div>
      {edit.visible ? (
        <EditParticipant
          edit={edit}
          editOnChange={editOnChange}
          setEdit={setEdit}
        />
      ) : null}
      <AddPart addPart={addPart} setAddPart={setAddPart} />
    </div>
  );
};

export default Table;
