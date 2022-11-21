import { useState } from "react";
import { deleteOne as deleteFn } from "../api/users";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { SlExclamation } from "react-icons/sl";

export default function DeleteOne({
  deleteOne,
  setDeleteOne,
  editOpen,
  setEditOpen,
}) {
  const { visible, id, name } = deleteOne;
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id) => {
      setLoading(true);
      await deleteFn(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setLoading(false);
        setDeleteOne({ visible: false });
        setEditOpen({ visible: false });
        toast.success("Contact deleted.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
            {!isLoading ? (
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
              <Spinner />
            )}

            <div className="flex justify-center gap-4 mt-10">
              {!isLoading ? (
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
              ) : null}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
