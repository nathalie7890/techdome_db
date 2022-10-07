import { editParticipant } from "../api/participants";
import { Modal, TextInput, Label, Button } from "flowbite-react";

const EditParticipant = ({ modal, editPart, setModal, setEditPart }) => {
  const editHandler = async (id) => {
    await editParticipant(editPart, id);
    setModal({ open: false });
  };

  const onChangeHandler = (e) => {
    setEditPart({ ...editPart, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      show={modal.open}
      size="md"
      popup={true}
      onClose={() => setModal({ open: false })}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="px-6 pb-4 space-y-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Participant
          </h3>
          <div>
            <div className="block mb-2">
              <Label htmlFor="event" value="Event" />
            </div>
            <TextInput
              id="email"
              value={editPart.Event}
              name="Event"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              name="Name"
              value={editPart.Name}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="schoolOrg" value="School/Organisation" />
            </div>
            <TextInput
              id="schoolOrg"
              name="School/Organisation"
              value={editPart["School/Organisation"]}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="ic" value="IC Number" />
            </div>
            <TextInput
              id="ic"
              name="IC Number"
              value={editPart["IC Number"]}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="Email"
              value={editPart.Email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <div className="block mb-2">
                <Label htmlFor="contact" value="Contact Number" />
              </div>
              <TextInput
                id="contact"
                name="Contact number"
                value={editPart["Contact number"]}
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex flex-col">
              <div className="block mb-2">
                <Label htmlFor="age" value="age" />
              </div>
              <TextInput
                id="age"
                name="age"
                value={editPart.age}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="w-full">
            <Button onClick={() => editHandler(modal.id)}>Save</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditParticipant;
