import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editEvent as edit } from "../api/events";
import DeleteOne from "./DeleteOne";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { FiX } from "react-icons/fi";
import { styles } from "./styles/EditEvent.styles";

export default function EditEvent({
  editEvent,
  setEditEvent,
  editOpen,
  setEditOpen,
}) {
  const { id, name } = editEvent;
  const [isLoading, setLoading] = useState(false); //loading spinner on save btn
  const [eventName, setEventName] = useState(name);
  const [invalid, setInvalid] = useState(false); //invalid input
  const [deleteOne, setDeleteOne] = useState({ visible: false, id, name });

  
  const editOnChange = (e) => {
    setInvalid(false);
    setEditEvent({ ...editEvent, name: e.target.value });
  };

  useEffect(() => {
    setEventName(name);
  }, [id]);

  const queryClient = useQueryClient();
  const editMutation = useMutation(async ({ id, name }) => {
    const res = await edit(id, name);
    if (res === "409") {
      setLoading(false);
      toast.error("Event name already exists.");
      return;
    }
    await queryClient.invalidateQueries("events");
    setLoading(false);
    setEditOpen(false);
    toast.success("Event name changed.");
  });

  const editSubmit = (id, name) => {
    setLoading(true);
    if (
      isNaN(name.slice(-5)) ||
      name.split(" ").slice(-1).toString().length > 4
    ) {
      setLoading(false);
      setInvalid(true);
      return;
    }
    editMutation.mutate({ id, name });
    setInvalid(false);
  };

  return (
    <div className={styles.mainContainer}>
      {/* close icon */}
      <div className="flex justify-end">
        <FiX
          className={styles.closeIcon}
          onClick={() => setEditOpen({ visible: false })}
        />
      </div>
      {/* end of close icon */}

      <div>
        <h1 className={styles.eventName}>{eventName}</h1>
      </div>

      {/* change event name form */}
      <div className="flex flex-col h-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editSubmit(id, name);
          }}
          className="flex flex-col h-2/3"
        >
          <div className="flex flex-col mb-20">
            <label className="text-sm text-white">Event Name</label>
            <input
              type="text"
              className={`${styles.eventNameInput} ${
                invalid ? "border-red-300 border-2" : ""
              }`}
              name="name"
              value={name}
              onChange={editOnChange}
            />
            {invalid ? (
              <p className="text-sm font-semibold text-red-300">
                Event name must end with 4 numbers. E.g. Event 2022
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setDeleteOne({ visible: true, id, name })}
              className={styles.deleteBtn}
            >
              Delete Event
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`${styles.saveBtn} ${
                isLoading ? "pointer-events-none" : ""
              }`}
            >
              {isLoading ? <Spinner /> : "Save"}
            </button>
          </div>
        </form>
      </div>
      {/* end of change event name form */}
      <DeleteOne
        setEditOpen={setEditOpen}
        deleteOne={deleteOne}
        setDeleteOne={setDeleteOne}
      />
    </div>
  );
}
