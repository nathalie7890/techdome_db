import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DeleteOne from "./DeleteOne";
import { editParticipant } from "../api/participants";

export default function EditParticipant({ edit, editOnChange, setEdit }) {
  const { event, schoolOrg, age, name, ic } = edit;
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
      onSuccess: () => {
        queryClient.invalidateQueries("participants");
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
        className="flex justify-end w-full text-xl font-medium text-white"
        onClick={() => setEdit({ visible: false })}
      >
        X
      </button>
      <div className="flex flex-col justify-center h-full">
        <form
          className="flex flex-col justify-center space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            editSubmit(
              {
                Event: event,
                "School/Organisation": schoolOrg,
                age: age,
                Name: name,
                "IC Number": ic,
              },
              edit.id
            );
          }}
        >
          <h1 className="mb-8 text-3xl text-white">{edit.name}</h1>

          <input
            type="text"
            name="event"
            className="editParticipantInput"
            onChange={editOnChange}
            value={event}
          />
          <textarea
            type="text"
            name="schoolOrg"
            className="h-fit editParticipantInput"
            onChange={editOnChange}
            value={schoolOrg}
          />
          <input
            type="text"
            name="age"
            className="editParticipantInput"
            onChange={editOnChange}
            value={age}
          />
          <input
            type="text"
            name="name"
            className="editParticipantInput"
            onChange={editOnChange}
            value={name}
          />
          <input
            type="text"
            name="ic"
            className="editParticipantInput"
            onChange={editOnChange}
            value={ic}
          />
          <button
            className="flex justify-start font-semibold text-blue-300 hover:underline"
            type="button"
            onClick={() =>
              setDeleteOne({ visible: true, id: edit.id, name: name })
            }
          >
            Delete Participant
          </button>
          <div className="flex justify-end w-full space-x-2">
            <button
              className="px-6 py-1.5 text-white rounded-md bg-darkBlue hover:shadow-lg"
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
