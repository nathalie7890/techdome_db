import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteMany } from "../api/participants";
import { Modal, Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { SlExclamation } from "react-icons/sl";
import { style } from "./styles/DeleteMany.styles";

export default function DeleteMany({ data, setDeleteMany, setSelected }) {
  const { visible, selected, event } = data;
  const [isLoading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const deleteManyMutation = useMutation(
    async (array) => {
      setLoading(true);
      await deleteMany(event, array);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("participants");
        setLoading(false);
        setSelected([]);
        setDeleteMany({ visible: false });
        toast.success("Participant deleted.");
      },
    }
  );

  const deleteHandler = (selected) => {
    const array = [];
    selected.map((item) => array.push(item._id.toString()));
    deleteManyMutation.mutate(array);
  };

  return (
    <Modal
      show={visible}
      size="md"
      popup={true}
      onClose={() => setDeleteMany({ visible: false })}
    >
      <Modal.Header />
      <Modal.Body>
        {!isLoading ? (
          <div className="text-center">
            <SlExclamation className={style.exclamationIcon} />
            <h3 className={style.title}>
              {!isLoading
                ? `Are you sure you want to delete ${selected?.length} participants?`
                : `${selected?.length} participants have been deleted.`}
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
              <Button color="failure" onClick={() => deleteHandler(selected)}>
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => setDeleteMany({ visible: false })}
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
