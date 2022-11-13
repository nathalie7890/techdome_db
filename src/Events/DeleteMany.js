import { useState } from "react";
import { deleteManyEvent } from "../api/events";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button } from "flowbite-react";
import { SlExclamation, SlCheck } from "react-icons/sl";

export default function DeleteMany({
  deleteMany,
  setDeleteMany,
  data,
  setSelected,
}) {
  const { visible } = deleteMany;
  const [deleted, setDeleted] = useState(false);

  const onClose = () => {
    setSelected([]);
    setDeleteMany({ visible: false });
  };

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async (data) => {
      await deleteManyEvent(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
        setSelected([]);
        setDeleted(true);
      },
    },
    {
      onError: () => {
        alert("Cannot delete events");
      },
    }
  );
  const deleteHandler = (data) => {
    deleteMutation.mutate(data);
  };

  return (
    <div>
      <Modal show={visible} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {!deleted ? (
              <>
                <SlExclamation className="w-full mb-8 text-red-500 text-7xl" />
                <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  You are about to delete
                  <br />
                  <span className="text-xl font-semibold text-blue-600">
                    {data.length} events.
                  </span>
                </h1>
              </>
            ) : (
              <>
                <SlCheck className="w-full mb-8 text-green-400 text-7xl" />
                <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  <span className="text-xl font-semibold text-blue-600">
                    {data.length} events
                  </span>
                  <br /> has been deleted.
                </h1>
              </>
            )}

            <div className="flex justify-center gap-4 mt-10">
              {!deleted ? (
                <>
                  <Button color="failure" onClick={() => deleteHandler(data)}>
                    Confirm
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setDeleteMany({ visible: false })}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  color="gray"
                  onClick={() => {
                    setDeleted(false);
                    setDeleteMany({ visible: false });
                  }}
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
