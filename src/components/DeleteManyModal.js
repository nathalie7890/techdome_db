import { Button, Modal } from "flowbite-react";

const DeleteManyModal = ({ toggleModal, setToggle, count }) => {
  return (
    <>
      <Modal show={toggleModal} size="sm">
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-xl font-semibold leading-relaxed text-center ">
              Deleted {count} participant.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center w-full">
            <Button onClick={() => setToggle(false)} className="bg-red-400">Ok</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteManyModal;
