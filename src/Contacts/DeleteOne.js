import { useState } from "react";
import { deleteOne as deleteFn } from "../api/users";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { SlExclamation } from "react-icons/sl";
import { styles } from "./styles/DeleteOne.styles";

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
        toast.success("Contact deleted.");
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
                <SlExclamation className={styles.exclamationIcon} />
                <h1 className={styles.title}>
                  You are about to delete
                  <br />
                  <span className={styles.titleSpan}>{name}</span>
                </h1>
              </>
            ) : (
              <Spinner />
            )}

            <div className={styles.footer}>
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
