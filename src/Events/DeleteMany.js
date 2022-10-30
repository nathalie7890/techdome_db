import { deleteManyEvent } from "../api/events";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button } from "flowbite-react";

export default function DeleteMany({ deleteMany, setDeleteMany, data }) {
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
        alert("Events deleted!");
        setDeleteMany({ visible: false });
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
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
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
