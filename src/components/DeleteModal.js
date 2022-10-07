import { Modal, Button } from "flowbite-react";
const DeleteModal = ({ modal, setModal, deleteHandler }) => {
  return (
    <Modal
      show={modal.open}
      size="md"
      popup={true}
      onClose={() => setModal({ open: false })}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <div className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete {modal.name} ?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={deleteHandler(modal.id)}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setModal({ open: false })}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
