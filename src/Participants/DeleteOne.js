import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteParticipant } from "../api/participants";
import { Modal, Button } from "flowbite-react";

export default function DeleteOne({ data, setState, setEdit }) {
  const { visible, id, name } = data;

  const [deleted, setDeleted] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id) => {
      await deleteParticipant(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("participants");
        setDeleted(true);
      },
    }
    );
    
    const deleteHandler = (id) => {
      mutation.mutate(id);
  };

  return (
    <Modal
      show={visible}
      size="md"
      popup={true}
      onClose={() => setState({ visible: false })}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {!deleted
              ? `Are you sure you want to delete ${name}?`
              : `${name} has been deleted.`}
          </h3>
          <div className="flex justify-center gap-4">
            {!deleted ? (
              <>
                <Button color="failure" onClick={() => deleteHandler(id)}>
                  Yes, I'm sure
                </Button>
                <Button
                  color="gray"
                  onClick={() => setState({ visible: false })}
                >
                  No, cancel
                </Button>
              </>
            ) : (
              <Button
                color="gray"
                onClick={() => {
                  setDeleted(false);
                  setState({ vsible: false });
                  setEdit({visible: false})
                }}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
