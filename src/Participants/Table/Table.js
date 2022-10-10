import { useState } from "react";
import { deleteParticipant } from "../../api/participants";
import { useMutation, useQueryClient } from "react-query";
import Filter from "../Filter/Filter";
import SelectEvent from "../Filter/Inputs/SelectEvent";

const Table = ({ data, rawData, setFilters, filters }) => {
  const [selected, setSelected] = useState([]);
  console.log(selected);

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

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id) => {
      await deleteParticipant(id);
    },
    {
      onSuccess: () => {
        alert("deleted");
        queryClient.invalidateQueries("participants");
      },
    }
  );

  const deleteHandler = (id) => {
    if (window.confirm()) {
      mutation.mutate(id);
    } else return;
  };
  return (
    <div>
      <Filter rawData={rawData} setFilters={setFilters} filters={filters} />
      <h1>Showing {data.length} result</h1>
      <h1>{selected.length} is selected</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  type="checkbox"
                  name="allSelect"
                  checked={selected.length === data.length}
                  onChange={(e) => handleChange(e, data)}
                />
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
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Conact Number
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => {
              console.log(
                selected.some((item) => item.id == "63416aacee00b9ad58ce8ab3")
              );
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={person._id}
                >
                  <td className="px-6 py-4">
                    <input
                      key={person._id}
                      type="checkbox"
                      name={person._id}
                      checked={selected.some((item) => item?.id == person._id)}
                      onChange={(e) => handleChange(e, person._id)}
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {person.Event}
                  </th>
                  <td className="px-6 py-4">{person.Name}</td>
                  <td className="px-6 py-4">{person["School/Organisation"]}</td>
                  <td className="px-6 py-4">{person["IC Number"]}</td>
                  <td className="px-6 py-4">{person["Contact number"]}</td>
                  <td className="px-6 py-4">{person["Email"]}</td>
                  <td className="px-6 py-4">{person["age"]}</td>
                  <td className="px-6 py-4">
                    <button>Edit</button>
                    <button onClick={() => deleteHandler(person._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
