import { useState } from "react";
import { deleteOne as deleteFn } from "../api/users";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button } from "flowbite-react";
import { SlExclamation, SlCheck } from "react-icons/sl";

export default function DeleteOne({
  deleteOne,
  setDeleteOne,
  editOpen,
  setEditOpen,
}) {
  const { visible, id, name } = deleteOne;
  const [deleted, setDeleted] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id) => {
      await deleteFn(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setDeleted(true);
      },
    }
  );

  const deleteHandler = (id) => {
    mutation.mutate(id);
  };
  return (
    <div>
      <Modal
        show={visible}
        size="md"
        popup={true}
        onClose={() => setDeleteOne({ visible: false })}
      >
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
                    {name}
                  </span>
                </h1>
              </>
            ) : (
              <>
                <SlCheck className="w-full mb-8 text-green-400 text-7xl" />
                <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  <span className="text-xl font-semibold text-blue-600">
                    {name}
                  </span>
                  <br /> has been deleted.
                </h1>
              </>
            )}

            <div className="flex justify-center gap-4 mt-10">
              {!deleted ? (
                <>
                  <Button color="failure" onClick={() => deleteHandler(id)}>
                    Confirm
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setDeleteOne({ visible: false })}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  color="gray"
                  onClick={() => {
                    setDeleted(false);
                    setDeleteOne({ visible: false });
                    setEditOpen({ visible: false });
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
