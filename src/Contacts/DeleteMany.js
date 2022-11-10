import { useState } from "react";
import { deleteMany as deleteFn } from "../api/users";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button } from "flowbite-react";
import { SlExclamation, SlCheck } from "react-icons/sl";

export default function DeleteMany({ deleteMany, setDeleteMany, data }) {
  const { visible } = deleteMany;
  const [deleted, setDeleted] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data) => {
      await deleteFn(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setDeleted(true);
      },
    }
  );

  const deleteHandler = (data) => {
    mutation.mutate(data);
  };
  return (
    <div>
      <Modal
        show={visible}
        size="md"
        popup={true}
        onClose={() => setDeleteMany({ visible: false })}
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
                    {data.length} users.
                  </span>
                </h1>
              </>
            ) : (
              <>
                <SlCheck className="w-full mb-8 text-green-400 text-7xl" />
                <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  <span className="text-xl font-semibold text-blue-600">
                    {data.length} users
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
