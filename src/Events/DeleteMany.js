import { deleteManyEvent } from "../api/events";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button } from "flowbite-react";
import { toast } from "react-toastify";

export default function DeleteMany({ deleteMany, setDeleteMany, data, setSelected }) {
  const { visible } = deleteMany;
  const onClose = () => {
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
        // alert("Events deleted!");
        setSelected([])
        setDeleteMany({ visible: false });
        toast.success("Event upload fail", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
    },
    {
      onError: () => {
        alert("Cannot delete events");
      },
    },
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
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete {data.length} events?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => deleteHandler(data)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
