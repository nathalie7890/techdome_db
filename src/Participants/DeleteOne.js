import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteParticipant } from "../api/participants";
import { Modal, Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { SlExclamation } from "react-icons/sl";
import { styles } from "./styles/DeleteOne.styles";

export default function DeleteOne({ data, setDeleteOne, setEdit }) {
  const { visible, id, name } = data;
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (id) => {
      setLoading(true);
      await deleteParticipant(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("participants");
        setLoading(false);
        setDeleteOne({ vsible: false });
        setEdit({ visible: false });
        toast.success("Participant deleted.");
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
      onClose={() => setDeleteOne({ visible: false })}
    >
      <Modal.Header />
      <Modal.Body>
        {!isLoading ? (
          <div className="text-center">
            <SlExclamation className={styles.exclamationIcon} />
            <h3 className={styles.title}>
              Are you sure you want to delete {name}
            </h3>
          </div>
        ) : (
          <div className="flex justify-center h-20">
            <Spinner />
          </div>
        )}
        <div className="flex justify-center gap-4">
          {!isLoading ? (
            <>
              <Button color="failure" onClick={() => deleteHandler(id)}>
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => setDeleteOne({ visible: false })}
              >
                No, cancel
              </Button>
            </>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}
