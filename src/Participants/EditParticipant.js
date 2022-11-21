import { useState } from "react";
import { useQueryClient } from "react-query";
import DeleteOne from "./DeleteOne";
import { editParticipant } from "../api/participants";
import { toast } from "react-toastify";

export default function EditParticipant({ edit, editOnChange, setEdit }) {
  const { name, schoolOrg, age, ic, contact, email, address } = edit;

  const [deleteOne, setDeleteOne] = useState({
    visible: false,
    id: "",
    name: "",
  });

  const queryClient = useQueryClient();

  const editSubmit = async (data, id) => {
    // editMutation.mutate({ data, id });
    const res = await editParticipant(data, id);
    if (res.status === 200) {
      toast.success(`${res.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    await queryClient.invalidateQueries("participants");
    setEdit({ visible: false });
  };

  return (
    <div className=" py-10 sticky top-0 w-1/4 h-screen px-12 bg-gradient-to-tr from-[#3f51b5]  to-purple-500">
      <button
        className="flex justify-end w-full text-xl font-medium"
        onClick={() => setEdit({ visible: false })}
      >
        <span className="text-gray-300 material-symbols-outlined">close</span>
      </button>
      <div className="flex flex-col justify-center h-full">
        <form
          className="flex flex-col justify-center space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            editSubmit(
              {
                name,
                schoolOrg,
                age,
                ic,
                contact,
                email,
                address,
              },
              edit.id
            );
          }}
        >
          <div className="space-y-2.5">
            <div className="flex flex-col">
              <label className="text-sm text-white">Name</label>
              <input
                type="text"
                name="name"
                className="text-white bg-transparent border border-gray-300 rounded-md focus:border-white focus:ring-0"
                onChange={editOnChange}
                value={name}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="small_outlined" className="text-sm text-white">
                School/Organisation
              </label>
              <textarea
                type="text"
                name="schoolOrg"
                className="text-white bg-transparent border border-gray-300 rounded-md resize-none focus:border-white focus:ring-0"
                onChange={editOnChange}
                value={schoolOrg}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="small_outlined" className="text-sm text-white">
                Age
              </label>
              <input
                type="text"
                name="age"
                className="text-white bg-transparent border border-gray-300 rounded-md focus:border-white focus:ring-0"
                onChange={editOnChange}
                value={age}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="small_outlined" className="text-sm text-white">
                IC Number
              </label>
              <input
                type="text"
                name="ic"
                className="text-white bg-transparent border border-gray-300 rounded-md focus:border-white focus:ring-0"
                onChange={editOnChange}
                value={ic}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="small_outlined" className="text-sm text-white">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="text-white bg-transparent border border-gray-300 rounded-md focus:border-white focus:ring-0"
                onChange={editOnChange}
                value={email}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="small_outlined" className="text-sm text-white">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                className="text-white bg-transparent border border-gray-300 rounded-md focus:border-white focus:ring-0"
                onChange={editOnChange}
                value={contact}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="small_outlined" className="text-sm text-white">
                Address
              </label>
              <textarea
                type="text"
                name="address"
                className="text-white bg-transparent border border-gray-300 rounded-md resize-none focus:border-white focus:ring-0"
                onChange={editOnChange}
                value={address}
                rows="2"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="px-6 py-1.5 text-white bg-blue-800 rounded-md w-fit hover:bg-blue-900 "
              type="submit"
            >
              Save
            </button>
            <button
              className="px-6 py-1.5 text-white bg-red-400 rounded-md w-fit hover:bg-red-500"
              type="button"
              onClick={() =>
                setDeleteOne({ visible: true, id: edit.id, name: name })
              }
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <DeleteOne data={deleteOne} setDeleteOne={setDeleteOne} setEdit={setEdit} />
    </div>
  );
}
