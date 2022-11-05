import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editEvent as edit } from "../api/events";
import DeleteOne from "./DeleteOne";
import { AiOutlineClose } from "react-icons/ai";

export default function EditEvent({
  editEvent,
  setEditEvent,
  editOpen,
  setEditOpen,
}) {
  const { id, name } = editEvent;
  const [eventName, setEventName] = useState(name)
  const [deleteOne, setDeleteOne] = useState({ visible: false, id, name });
  const editOnChange = (e) => {
    setEditEvent({ ...editEvent, name: e.target.value });
  };

  useEffect(() => {
    setEventName(name)
  }, [id])

    
  const queryClient = useQueryClient();
  const editMutation = useMutation(
    async ({ id, name }) => {
      await edit(id, name);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("events");
        alert("Event name updated!");
        setEditOpen(false);
      },
    }
  );

  const editSubmit = (id, name) => {
    if (isNaN(name.slice(-5))) {
      alert("Event name must end with 4 numbers");
      return;
    }
    editMutation.mutate({ id, name });
  };

  return (
    <div className="sticky top-0 right-0 flex flex-col h-screen p-8">
      <div className="flex justify-end">
        <AiOutlineClose
          className="text-2xl text-white rounded-md hover:text-yellow-200"
          onClick={() => setEditOpen({ visible: false })}
        />
      </div>
      <div>
        <h1 className="text-4xl font-semibold text-white">{eventName}</h1>
      </div>
      <div className="flex flex-col justify-center h-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editSubmit(id, name);
          }}
          className="flex flex-col h-2/3"
        >
          <div className="flex flex-col mb-20">
            <label className="text-white/60 text-md">Event Name</label>
            <input
              type="text"
              className="mt-2 mb-6 text-white bg-transparent border-white rounded-md focus:border-white focus:ring-white"
              name="name"
              value={name}
              onChange={editOnChange}
            />
            <button
              type="button"
              onClick={() => setDeleteOne({ visible: true, id, name })}
              className="flex justify-start font-semibold text-blue-300 w-fit hover:text-yellow-200"
            >
              Delete Event
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-1 text-white rounded-md bg-darkBlue w-fit hover:bg-lightBlue hover:text-black"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <DeleteOne
        setEditOpen={setEditOpen}
        deleteOne={deleteOne}
        setDeleteOne={setDeleteOne}
      />
    </div>
  );
}
