import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteMany } from "../../api/participants";
import { Modal, Button } from "flowbite-react";

export default function DeleteMany({ data, setState, setSelected }) {
  const { visible, selected } = data;
  const [deleted, setDeleted] = useState(false);

  const queryClient = useQueryClient();
  const deleteManyMutation = useMutation(
    async (array) => {
      await deleteMany(array);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("participants");
        setDeleted(true);
        setSelected([])
      },
    }
  );

  const deleteHandler = (selected) => {
    const array = [];
    selected.map((item) => array.push(Object.values(item).toString()));
    deleteManyMutation.mutate(array);
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
              ? `Are you sure you want to delete ${selected?.length} participants?`
              : `${selected?.length} participants have been deleted.`}
          </h3>
          <div className="flex justify-center gap-4">
            {!deleted ? (
              <>
                <Button color="failure" onClick={() => deleteHandler(selected)}>
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
                  setState({ visible: false });
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
