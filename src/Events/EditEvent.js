import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { editEvent as edit } from "../api/events";
import { deleteEvent } from "../api/events";
import { AiOutlineClose } from "react-icons/ai";

export default function EditEvent({
  editEvent,
  setEditEvent,
  editOpen,
  setEditOpen,
}) {
  const { id, name } = editEvent;
  const editOnChange = (e) => {
    setEditEvent({ ...editEvent, name: e.target.value });
  };

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
    editMutation.mutate({ id, name });
  };

  const deleteMutation = useMutation(
    async (id) => {
      await deleteEvent(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
        alert("Event deleted!");
        setEditOpen(false);
      },
    }
  );

  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="sticky top-0 right-0 flex flex-col h-[calc(100vh-16px)] p-8">
      <div className="flex justify-end">
        <AiOutlineClose
          className="text-2xl text-white rounded-md hover:text-yellow-200"
          onClick={() => setEditOpen(false)}
        />
      </div>
      <div>
        <h1 className="text-4xl font-semibold text-white">Edit</h1>
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
              onClick={() => deleteHandler(id)}
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
      <div></div>
    </div>
  );
}
