import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditParticipant from "./EditParticipant";
import DeleteManyModal from "../components/DeleteManyModal";
import { deleteParticipant, deleteMany } from "../api/participants";

const Table = ({ data, clearChecked, filtered, setData}) => {
  let [checked, setChecked] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    id: "",
  });

  const [editPart, setEditPart] = useState({
    Event: "",
    Name: "",
    "School/Organisation": "",
    "IC Number": "",
    Email: "",
    "Contact number": "",
    age: "",
  });

  const [deleteManyModal, setDeleteManyModal] = useState(false);

  const checkHandler = (id) => {
    if (checked.length === 0) {
      setChecked([...checked, { id }]);
      return;
    }

    let found = checked.find((check) => {
      if (check.id === id) return true;
    });

    if (found) {
      removeHandler(id);
    } else {
      addHandler(id);
    }
  };

  const removeHandler = (id) => {
    setChecked(checked.filter((participant) => participant.id !== id));
    return;
  };

  const addHandler = (id) => {
    setChecked([...checked, { id }]);
  };

  const deleteHandler = async (id) => {
    await deleteParticipant(id);
    alert("deleted");
    setData(filtered);
  };

  const deleteManyHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You're about to delete ${checked.length} participants`,
      showCancelButton: true,
      confirmButtonColor: "#0a0af7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const array = [];
        checked.map((check) => array.push(Object.values(check).toString()));
        deleteMany(array);
        setChecked([]);
        Swal.fire(
          "Deleted!",
          `${checked.length} has been deleted.`,
          "success",
          {
            confirmButtonColor: "#6186c2",
          }
        );
      }
    });
  };

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  useEffect(() => {
    if (clearChecked) setChecked([]);
  }, [data]);

  return (
    <div>
      <EditParticipant
        modal={modal}
        editPart={editPart}
        setModal={setModal}
        setEditPart={setEditPart}
      />

      <div className="flex justify-between w-full">
        <div className="flex flex-row gap-4">
          <h1 className="text-zinc-600">Showing {data.length} results</h1>
          <h1 className="text-blue-600">{checked.length} selected</h1>
        </div>
        {checked.length > 0 ? (
          <button
            className="px-4 py-1 text-white rounded-md bg-rose-500"
            onClick={deleteManyHandler}
          >
            Delete
          </button>
        ) : null}
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Event
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                School/Organization
              </th>
              <th scope="col" className="px-6 py-3">
                IC Number
              </th>

              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Number
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data
                .sort((a, b) => (a.Event > b.Event ? -1 : 1))
                .map((participant, i) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={i}
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <input
                          type="checkbox"
                          name={participant._id}
                          value={participant._id}
                          onClick={() => checkHandler(participant._id)}
                          key={participant._id}
                        />
                      </th>
                      <th
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        scope="row"
                      >
                        {participant.Event}
                      </th>
                      <td className="px-6 py-4">{participant.Name}</td>
                      <td className="px-6 py-4">
                        {participant["School/Organisation"]}
                      </td>
                      <td className="px-6 py-4">{participant["IC Number"]}</td>
                      <td className="px-6 py-4">{participant["Email"]}</td>
                      <td className="px-6 py-4">
                        {participant["Contact number"]}
                      </td>
                      <td className="px-6 py-4">{participant["age"]}</td>
                      <td className="px-6 py-4 text-right">
                        {checked.length <= 0 ? (
                          <>
                            <button
                              className="text-sky-500"
                              onClick={() => {
                                setModal({
                                  open: true,
                                  id: participant._id,
                                });
                                setEditPart({
                                  Event: participant.Event,
                                  Name: participant.Name,
                                  "School/Organisation":
                                    participant["School/Organisation"],
                                  "IC Number": participant["IC Number"],
                                  Email: participant.Email,
                                  "Contact number":
                                    participant["Contact number"],
                                  age: participant.age,
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-pink-600"
                              onClick={() => deleteHandler(participant._id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td>
                  <h1 className="w-full p-6 text-4xl font-medium text-slate-700">
                    No Participant
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteManyModal
        toggleModal={deleteManyModal}
        setToggle={setDeleteManyModal}
        count={checked.length}
      />
    </div>
  );
};

export default Table;
