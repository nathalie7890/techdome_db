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
      "absolute text-sm text-gray-200  duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-mediumBlue  px-2 peer-focus:px-2 peer-focus:text-yellow-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1",
  };

  return (
    <div className="sticky top-0 w-1/4 h-screen p-12 shadow-xl bg-mediumBlue shadow-darkBlue">
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
          <h1 className="mb-8 text-3xl font-semibold text-white">Edit</h1>
          <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              className={floatingInput.input}
              onChange={editOnChange}
              value={name}
            />
            <label htmlFor="small_outlined" className={floatingInput.label}>
              Name
            </label>
          </div>
          <div className="relative">
            <textarea
              type="text"
              name="schoolOrg"
              className={`${floatingInput.input} resize-none`}
              onChange={editOnChange}
              value={schoolOrg}
            />
            <label htmlFor="small_outlined" className={floatingInput.label}>
              School/Organisation
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="age"
              className={floatingInput.input}
              onChange={editOnChange}
              value={age}
            />
            <label htmlFor="small_outlined" className={floatingInput.label}>
              Age
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="ic"
              className={floatingInput.input}
              onChange={editOnChange}
              value={ic}
            />
            <label htmlFor="small_outlined" className={floatingInput.label}>
              IC Number
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="email"
              className={floatingInput.input}
              onChange={editOnChange}
              value={email}
            />
            <label htmlFor="small_outlined" className={floatingInput.label}>
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="contact"
              className={floatingInput.input}
              onChange={editOnChange}
              value={contact}
            />
            <label htmlFor="small_outlined" className={floatingInput.label}>
              Contact Number
            </label>
          </div>
          <div className="relative">
            <textarea
              type="text"
              name="address"
              className={`${floatingInput.input} resize-none`}
              onChange={editOnChange}
              value={address}
              rows="3"
            />
            <label htmlFor="small_outlined" className={floatingInput.label}>
              Address
            </label>
          </div>
          </div>
          <button
            className="flex justify-start font-semibold text-blue-300 hover:text-yellow-200 w-fit"
            type="button"
            onClick={() =>
              setDeleteOne({ visible: true, id: edit.id, name: name })
            }
          >
            Delete Participant
          </button>
          <div className="flex justify-end w-full space-x-2">
            <button
              className="px-6 py-1 text-white rounded-md bg-darkBlue hover:bg-lightBlue hover:text-black"
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
