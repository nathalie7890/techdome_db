import { useState, useEffect } from "react";
import EditContact from "./EditContact";
import ContactFilter from "./ContactFilter";
import ContactSearch from "./ContactSearch";
import AddContact from "./AddContact";
import DeleteMany from "./DeleteMany";
import { checkAuth } from "../api/users";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { styles } from "./styles/ContactTable.styles";

export default function ContactTable({
  data,
  editOpen,
  setEditOpen,
  filters,
  setFilters,
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
    <div className={styles.mainContainer}>
      <div className={`${editOpen.visible ? "w-3/4" : "w-full"} p-8`}>
        <h1 className={styles.pageTitle}>Users</h1>

        {/* search, add, delete */}
        <div className="py-6 space-y-6 bg-white rounded-t-lg">
          <ContactSearch filters={filters} setFilters={setFilters} />
          <div className="flex items-end justify-between">
            <ContactFilter filters={filters} setFilters={setFilters} />
            <div className="hidden space-x-2 md:flex">
              <button onClick={() => setAddUser(true)} className={styles.addBtn}>
                <IoAdd className={styles.addIcon} />
              </button>

              {selected.length > 0 ? (
                <button
                  className={styles.deleteBtn}
                  onClick={() => setDeleteMany({ visible: true })}
                >
                  <FiTrash2 className="text-white" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {/* end of search, add, delete */}

        <div className="flex mb-2">
          <h1>Showing {data.length} result</h1>
          <h1 className="mx-4 italic font-medium text-blue-600">
            {selected.length > 0 ? `${selected.length} selected` : null}
          </h1>
        </div>

        {/* table */}
        <div className={styles.tableContainer}>
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
                <th
                  scope="col"
                  className={`hidden px-6 py-3 ${
                    windowHeight < 500 ? "hidden" : "sm:block"
                  }`}
                >
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
                      <td
                        className={`hidden px-6 py-4 ${
                          windowHeight < 500 ? "hidden" : "sm:block"
                        }`}
                      ></td>
                      <th scope="row" className={styles.th}>
                        {person.name}
                      </th>
                      <td className="px-6 py-4 md:break-all">
                        {person.username}
                      </td>
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
                      <td
                        className={`hidden px-6 py-4 ${
                          windowHeight < 500 ? "hidden" : "sm:block"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="singleSelect"
                          checked={selected.some((e) => e?.id === person._id)}
                          onChange={(e) => selectOnChange(e, person)}
                        />
                      </td>
                      <th scope="row" className={styles.th}>
                        {person.name}
                      </th>
                      <td className="px-6 py-4 md:break-all">
                        {person.username}
                      </td>
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
                      <td
                        className={`hidden px-6 py-4 text-right ${
                          windowHeight < 500 ? "hidden" : "sm:block"
                        }`}
                      >
                        <button
                          className={styles.editBtn}
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
        {/* end of table */}
      </div>
      <div
        className={`${editOpen.visible ? "w-1/4" : "hidden"} ${
          styles.rightDrawerContainer
        }`}
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
