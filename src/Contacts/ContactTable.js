import { useState } from "react";
import EditContact from "./EditContact";
import ContactFilter from "./ContactFilter";
import ContactSearch from "./ContactSearch";
import AddContact from "./AddContact";
import DeleteMany from "./DeleteMany";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";

export default function ContactTable({
  data,
  editOpen,
  setEditOpen,
  filters,
  setFilters,
}) {
  const [selected, setSelected] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [deleteMany, setDeleteMany] = useState({ visible: false });

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

  const [roleChange, setRoleChange] = useState({
    id: "",
    role: "",
  });

  return (
    <div className="flex w-full min-h-screen bg-white">
      <div className={`${editOpen.visible ? "w-3/4" : "w-full"} p-8`}>
        <h1 className="my-6 text-5xl font-semibold text-blue-400">Users</h1>
        <div className="py-6 space-y-6 bg-white rounded-t-lg">
          <ContactSearch filters={filters} setFilters={setFilters} />
          <div className="flex items-end justify-between">
            <ContactFilter filters={filters} setFilters={setFilters} />
            <div className="flex space-x-2">
              <button
                onClick={() => setAddUser(true)}
                className="px-3 py-3 bg-blue-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-blue-600 text-center border border-gray-400"
              >
                <IoAdd className="text-lg font-bold text-white" />
              </button>

              {selected.length > 0 ? (
                <button
                  className="px-3 py-3 bg-red-500 rounded-full drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] hover:bg-red-600 border border-gray-400"
                  onClick={() => setDeleteMany({ visible: true })}
                >
                  <FiTrash2 className="text-white" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <th scope="col" className="flex px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => {
                return (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        name="singleSelect"
                        checked={selected.some((e) => e?.id === user._id)}
                        onChange={(e) => selectOnChange(e, user)}
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        user.isAdmin ? "text-blue-500 " : "text-green-400"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "Non-Admin"}
                    </td>
                    <td className="px-6 py-4">
                      {user.date.toString().slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="font-medium text-blue-600 hover:underline"
                        onClick={() => {
                          setEditOpen({ visible: true, name: user.name });
                          setRoleChange({
                            id: user._id,
                            role: user.isAdmin,
                          });
                        }}
                      >
                        <AiOutlineEdit className="text-gray-500" />
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
        className={`${
          editOpen.visible ? "w-1/4" : "hidden"
        } bg-gradient-to-br from-[#3f51b5]  to-purple-500 shadow-lg`}
      >
        <EditContact
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          roleChange={roleChange}
          setRoleChange={setRoleChange}
        />
        <DeleteMany
          deleteMany={deleteMany}
          setDeleteMany={setDeleteMany}
          data={selected}
        />
        <AddContact addUser={addUser} setAddUser={setAddUser} />
      </div>
    </div>
  );
}
