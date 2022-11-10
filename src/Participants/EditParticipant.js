import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DeleteOne from "./DeleteOne";
import { editParticipant } from "../api/participants";

export default function EditParticipant({ edit, editOnChange, setEdit }) {
  const { name, schoolOrg, age, ic, contact, email, address } = edit;

  const [deleteOne, setDeleteOne] = useState({
    visible: false,
    id: "",
    name: "",
  });

  const queryClient = useQueryClient();
  const editMutation = useMutation(
    async ({ data, id }) => {
      await editParticipant(data, id);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("participants");
        setEdit({ visible: false });
      },
    }
  );

  const editSubmit = (data, id) => {
    editMutation.mutate({ data, id });
  };

  const floatingInput = {
    input:
      "block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-white-600 peer focus:border-white text-white",
    label:
      "absolute text-sm text-gray-200  duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-transparent  px-2 peer-focus:px-2 peer-focus:text-yellow-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1",
  };

  return (
    <div className="sticky top-0 w-1/4 h-screen p-12 bg-gradient-to-tr from-[#3f51b5]  to-purple-500">
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
          <h1 className="mb-4 text-3xl font-semibold text-white">Edit</h1>
          <div className="space-y-2">
            <div className="flex flex-col">
              <label className="text-sm text-white">
                Name
              </label>
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
                rows="3"
              />
            </div>
          </div>
          <button
            className="flex justify-start font-semibold text-yellow-200 hover:text-red-300 w-fit"
            type="button"
            onClick={() =>
              setDeleteOne({ visible: true, id: edit.id, name: name })
            }
          >
            Delete Participant
          </button>
          <div className="flex justify-end w-full">
            <button
              className="px-6 py-2 text-white bg-blue-900 rounded-full w-fit hover:bg-blue-80 drop-shadow-[0_5px_8px_rgba(0,0,0,0.2)]"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <DeleteOne data={deleteOne} setState={setDeleteOne} setEdit={setEdit} />
    </div>
  );
}
