import { useState } from "react";
import { CSVLink } from "react-csv";
import Filter from "../Filter/Filter";
import DeleteMany from "./DeleteMany";
import EditParticipant from "../EditParticipant";
import Add from "../AddParticipant";

const Table = ({ data, rawData, setFilters, filters }) => {
  const [selected, setSelected] = useState([]);
  const [fileName, setFileName] = useState("participants.csv");

  const [deleteMany, setDeleteMany] = useState({
    visible: false,
    selected: [],
  });

  const [edit, setEdit] = useState({
    visible: false,
    id: "",
    event: "",
    schoolOrg: "",
    name: "",
    age: "",
    ic: "",
  });

  const [add, setAdd] = useState({
    visible: false,
  });

  const handleChange = (e, person) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect") {
        setSelected([]);
        data.map((item) =>
          setSelected((selected) => [...selected, { id: item._id }])
        );
      } else {
        setSelected([...selected, { id: person }]);
      }
    } else {
      if (name === "allSelect") setSelected([]);
      else {
        let tempuser = selected.filter((item) => item.id !== person);
        setSelected(tempuser);
      }
    }
  };

  const downloadHandler = async (e, done) => {
    let filename = await prompt("Please enter file name:");
    await setFileName(filename);
    done();
  };

  const editOnChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-row w-[calc(100vw-80px)]">
      <div
        className={`px-12 py-12 bg-lightBlue ${
          edit.visible ? "w-3/4" : "w-full"
        }`}
      >
        <h1 className="text-5xl font-semibold">Dashboard</h1>
        <Filter rawData={rawData} setFilters={setFilters} filters={filters} />
        <div className="flex justify-between px-6 pt-6 pb-2 bg-white">
          <div className="flex">
            <h1>Showing {data.length} result</h1>
            <h1 className="mx-4 italic font-medium text-blue-600">
              {selected.length > 0 ? `${selected.length} selected` : null}
            </h1>
          </div>
          <div className="flex gap-2">
            {selected.length > 0 ? (
              <>
                <button
                  onClick={() => setDeleteMany({ visible: true, selected })}
                  className="px-4 py-1 text-white bg-red-500 rounded-md"
                >
                  Delete
                </button>
                <CSVLink
                  data={data}
                  separator={";"}
                  onClick={(e, done) => downloadHandler(e, done)}
                  asyncOnClick={true}
                  filename={`${fileName}`}
                  className="px-4 py-1.5 text-white bg-yellow-400 rounded-md"
                >
                  Download
                </CSVLink>{" "}
              </>
            ) : null}
            <button
              onClick={() => setAdd({ visible: true })}
              className="px-4 py-1.5 text-white bg-darkBlue rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md rounded-b-xl">
          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
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
                <th scope="col" className="px-6 py-3"></th>
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
                        className="bg-white border-b hover:bg-gray-300"
                        key={person._id}
                      >
                        <td className="px-6 py-4">
                          <input
                            key={person._id}
                            type="checkbox"
                            name={person._id}
                            checked={selected.some(
                              (item) => item?.id == person._id
                            )}
                            onChange={(e) => handleChange(e, person._id)}
                          />
                        </td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {person.Event}
                        </th>
                        <td className="px-6 py-4">{person.Name}</td>
                        <td className="px-6 py-4">
                          {person["School/Organisation"]}
                        </td>
                        <td className="px-6 py-4">{person["IC Number"]}</td>
                        {!edit.visible ? (
                          <>
                            <td className="px-6 py-4">{person["Email"]}</td>
                            <td className="px-6 py-4">
                              {person["Contact number"]}
                            </td>
                          </>
                        ) : null}
                        <td className="px-6 py-4">{person["age"]}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              setEdit({
                                visible: true,
                                id: person._id,
                                event: person.Event,
                                schoolOrg: person["School/Organisation"],
                                age: person.age,
                                name: person.Name,
                                ic: person["IC Number"],
                              })
                            }
                          >
                            <span className="text-gray-500 material-symbols-outlined hover:text-white">
                              chevron_right
                            </span>
                          </button>
                        </td>
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
        </div>
      </div>
      {edit.visible ? (
        <EditParticipant
          edit={edit}
          editOnChange={editOnChange}
          setEdit={setEdit}
        />
      ) : null}
      <Add add={add} setAdd={setAdd} />
    </div>
  );
};

export default Table;
