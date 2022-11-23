import { useState } from "react";
import EditContact from "./EditContact";
import ContactFilter from "./ContactFilter";
import ContactSearch from "./ContactSearch";
import AddContact from "./AddContact";
import DeleteMany from "./DeleteMany";
import { checkAuth } from "../api/users";
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
  const { user } = checkAuth();
  const [selected, setSelected] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [deleteMany, setDeleteMany] = useState({ visible: false });

  const selectOnChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect") {
        setSelected([]);
        data
          .filter((person) => person._id !== user.data._id)
          .map((event) =>
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
            <div className="hidden space-x-2 md:flex">
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
        <div className="flex mb-2">
          <h1>Showing {data.length} result</h1>
          <h1 className="mx-4 italic font-medium text-blue-600">
            {selected.length > 0 ? `${selected.length} selected` : null}
          </h1>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="hidden px-6 py-3 md:block">
                  <input
                    type="checkbox"
                    name="allSelect"
                    checked={selected.length === data.length - 1}
                    onChange={(e) => selectOnChange(e, data)}
                  />
                </th>
                <th scope="col" className="px-6 py-3">
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
                <th scope="col" className="hidden px-6 py-3 md:block">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((person) => person._id === user.data._id)
                .map((person) => {
                  return (
                    <tr className="border-b bg-sky-100/70" key={person._id}>
                      <td className="hidden px-6 py-4 md:block"></td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 md:break-all"
                      >
                        {person.name}
                      </th>
                      <td className="px-6 py-4 md:break-all">{person.username}</td>
                      <td className="px-6 py-4 md:break-all">{person.email}</td>
                      <td className="px-6 py-4 font-semibold text-blue-500 md:break-all">
                        {person.isAdmin ? "Admin" : "Non-Admin"}
                      </td>
                      <td className="px-6 py-4 md:break-all">
                        {person.date.toString().slice(0, 10)}
                      </td>
                      <td className="hidden px-6 py-4 md:block"></td>
                    </tr>
                  );
                })}
              {data
                .filter((person) => person._id !== user.data._id)
                .map((person) => {
                  return (
                    <tr
                      key={person._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="hidden px-6 py-4 md:block">
                        <input
                          type="checkbox"
                          name="singleSelect"
                          checked={selected.some((e) => e?.id === person._id)}
                          onChange={(e) => selectOnChange(e, person)}
                        />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 md:break-all"
                      >
                        {person.name}
                      </th>
                      <td className="px-6 py-4 md:break-all">{person.username}</td>
                      <td className="px-6 py-4 md:break-all">{person.email}</td>
                      <td
                        className={`px-6 py-4 font-semibold md:break-all ${
                          person.isAdmin ? "text-blue-500 " : "text-green-400"
                        }`}
                      >
                        {person.isAdmin ? "Admin" : "Non-Admin"}
                      </td>
                      <td className="px-6 py-4 md:break-all">
                        {person.date.toString().slice(0, 10)}
                      </td>
                      <td className="hidden px-6 py-4 text-right md:block">
                        <button
                          className="font-medium text-blue-600 hover:underline"
                          onClick={() => {
                            setEditOpen({ visible: true, name: person.name });
                            setRoleChange({
                              id: person._id,
                              role: person.isAdmin,
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
          setSelected={setSelected}
        />
        <AddContact addUser={addUser} setAddUser={setAddUser} />
      </div>
    </div>
  );
}
