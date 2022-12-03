import { useState } from "react";
import { deleteManyEvent } from "../api/events";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button } from "flowbite-react";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { SlExclamation } from "react-icons/sl";
import { styles } from "./styles/DeleteMany.styles";

export default function DeleteMany({
  deleteMany,
  setDeleteMany,
  data,
  setSelected,
}) {
  const { visible } = deleteMany;
  const [isLoading, setLoading] = useState(false);

  const onClose = () => {
    setSelected([]);
    setDeleteMany({ visible: false });
  };

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async (data) => {
      setLoading(true);
      await deleteManyEvent(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
        setSelected([]);
        setLoading(false);
        setDeleteMany({ visible: false });
        toast.success("Event deleted.");
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
            {!isLoading ? (
              <>
                <SlExclamation className={styles.exclamationIcon} />
                <h1 className={styles.title}>
                  You are about to delete
                  <br />
                  <span className={styles.titleSpan}>
                    {data.length} events.
                  </span>
                </h1>
              </>
            ) : (
              <Spinner />
            )}

            <div className={styles.btnContainer}>
              {!isLoading ? (
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
              ) : null}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
