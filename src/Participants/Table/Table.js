import { useState } from "react";
import { CSVLink } from "react-csv";
import Add from "../AddParticipant";
import Filter from "../Filter/Filter";
import DeleteMany from "./DeleteMany";
import { checkAuth } from "../../api/users";
import EditParticipant from "../EditParticipant";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";

const Table = ({ data, rawData, setFilters, filters, event }) => {
  const { isAdmin } = checkAuth();
  const [selected, setSelected] = useState([]);
  const [fileName, setFileName] = useState("participants.csv");

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

  const [add, setAdd] = useState({
    visible: false,
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
    <div className="flex flex-row w-[calc(100vw-80px)]">
      <div
        className={`px-12 py-12 bg-white ${edit.visible ? "w-3/4" : "w-full"}`}
      >
        <h1 className="text-5xl font-semibold text-blue-400">{event}</h1>
        <Filter rawData={rawData} setFilters={setFilters} filters={filters} />
        <div className="flex items-end justify-between pt-6 pb-2 bg-white">
          <div className="flex">
            <h1>Showing {data.length} result</h1>
            <h1 className="mx-4 italic font-medium text-blue-600">
              {selected.length > 0 ? `${selected.length} selected` : null}
            </h1>
          </div>
          <div className="flex gap-4">
            {selected.length > 0 ? (
              <>
                <button
                  onClick={() =>
                    setDeleteMany({ visible: true, selected, event })
                  }
                  className="px-3.5 py-3.5 bg-purple-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-purple-600 border border-gray-400"
                >
                  <BsDownload className="text-white" />
                </button>
                <CSVLink
                  data={selected}
                  onClick={downloadHandler}
                  asyncOnClick={true}
                  filename={`${fileName}`}
                  className="px-3.5 py-3.5 bg-red-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-red-600 border border-gray-400"
                >
                  <FiTrash2 className="text-white" />
                </CSVLink>{" "}
              </>
            ) : null}
          </div>
        </div>
        <div className="max-w-full overflow-x-auto rounded-b-lg shadow-md">
          <table className="max-w-full text-sm text-left text-gray-500 bg-white">
            <thead className="text-xs text-gray-700 uppercase bg-blue-50 ">
              <tr>
                {isAdmin ? (
                  <th scope="col" className="px-6 py-3">
                    {data.length > 0 ? (
                      <input
                        type="checkbox"
                        name="allSelect"
                        checked={selected.length === data.length}
                        onChange={(e) => handleChange(e, data)}
                      />
                    ) : null}
                  </th>
                ) : null}
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
                      Conact Number
                    </th>
                  </>
                ) : null}
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                {isAdmin ? (
                  <th scope="col" className="px-6 py-3">
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
                        {isAdmin ? (
                          <td className="px-6 py-4">
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
                        ) : null}
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {event}
                        </th>
                        <td className="px-6 py-4">{person.name}</td>
                        <td className="px-6 py-4">{person.schoolOrg}</td>
                        <td className="px-6 py-4">{person.ic}</td>
                        {!edit.visible ? (
                          <>
                            <td className="px-6 py-4">{person.email}</td>
                            <td className="px-6 py-4">{person.contact}</td>
                          </>
                        ) : null}
                        <td className="px-6 py-4">{person.age}</td>
                        {isAdmin ? (
                          <td className="px-6 py-4">
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

          <DeleteMany
            data={deleteMany}
            setState={setDeleteMany}
            setSelected={setSelected}
          />
          {/* <EditPart part={edit}
          editOnChange={editOnChange}
          setEdit={setEdit} /> */}
        </div>
      </div>
      {edit.visible ? (
        <EditParticipant
          edit={edit}
          editOnChange={editOnChange}
          setEdit={setEdit}
         
        />
      ) : null}
      <Add add={add} setAdd={setAdd} edit={edit} setEdit={setEdit} />
    </div>
  );
};

export default Table;
