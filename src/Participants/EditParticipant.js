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
          <input
            type="text"
            name="name"
            className="h-fit editParticipantInput"
            onChange={editOnChange}
            value={name}
          />
          <input
            type="text"
            name="schoolOrg"
            className="h-fit editParticipantInput"
            onChange={editOnChange}
            value={schoolOrg}
          />
          <input
            type="number"
            name="age"
            className="editParticipantInput"
            onChange={editOnChange}
            value={age}
          />
          <input
            type="text"
            name="ic"
            className="editParticipantInput"
            onChange={editOnChange}
            value={ic}
          />
          <input
            type="text"
            name="email"
            className="editParticipantInput"
            onChange={editOnChange}
            value={email}
          />
          <input
            type="text"
            name="contact"
            className="editParticipantInput"
            onChange={editOnChange}
            value={contact}
          />
          <input
            type="text"
            name="address"
            className="editParticipantInput"
            onChange={editOnChange}
            value={address}
          />
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
