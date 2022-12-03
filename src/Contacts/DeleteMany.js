import { useState } from "react";
import { deleteMany as deleteFn } from "../api/users";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { SlExclamation } from "react-icons/sl";
import { style } from "./styles/DeleteMany.styles";

export default function DeleteMany({
  deleteMany,
  setDeleteMany,
  data,
  setSelected,
}) {
  const { visible } = deleteMany;
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) => {
      setLoading(true);
      await deleteFn(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setLoading(false);
        setSelected([]);
        setDeleteMany({ visible: false });
        toast.success("Contact deleted.");
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
            {!isLoading ? (
              <>
                <SlExclamation className={style.exclamationIcon} />
                <h1 className={style.title}>
                  You are about to delete
                  <br />
                  <span className={style.titleSpan}>{data.length} users.</span>
                </h1>
              </>
            ) : (
              <Spinner />
            )}

            <div className={style.footer}>
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
