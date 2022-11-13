import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";

export default function EditPart({ part }) {
  const { id, visible, name, schoolorg, age, ic, contact, email, address } =
    part;
  const [partName, setPartName] = useState("");
  const onClick = () => {};
  const onClose = () => {};
  const onChangeHandler = () => {};

  useEffect(() => {
    setPartName(name);
  });

  return (
    <div>
      <Modal show={visible} size="3xl" onClose={onClose}>
        <Modal.Header ><h1 className="px-6 py-2 text-4xl font-bold text-blue-600">{partName}</h1></Modal.Header>
        <Modal.Body>
          <div className="w-full p-6 space-y-6">
            <form className="w-full">
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border-gray-400 rounded-lg focus:border-blue-300 focus:ring-blue-300"
                  onChange={onChangeHandler}
                  value={part.name}
                />
              </div>
              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <label>IC Number</label>
                  <input
                    type="text"
                    name="ic"
                    className="w-full border-gray-400 rounded-lg focus:border-blue-300 focus:ring-blue-300"
                    onChange={onChangeHandler}
                    value={part.ic}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Age</label>
                  <input
                    type="text"
                    name="age"
                    className="w-full border-gray-400 rounded-lg focus:border-blue-300 focus:ring-blue-300"
                    onChange={onChangeHandler}
                    value={part.age}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>School/Organisation</label>
                <input
                  type="text"
                  name="schoolOrg"
                  className="w-full border-gray-400 rounded-lg focus:border-blue-300 focus:ring-blue-300"
                  onChange={onChangeHandler}
                  value={part.schoolOrg}
                />
              </div>
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border-gray-400 rounded-lg focus:border-blue-300 focus:ring-blue-300"
                  onChange={onChangeHandler}
                  value={part.email}
                />
              </div>
              <div className="flex flex-col">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  className="w-full border-gray-400 rounded-lg focus:border-blue-300 focus:ring-blue-300"
                  onChange={onChangeHandler}
                  value={part.contact}
                />
              </div>
              <div className="flex flex-col">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full border-gray-400 rounded-lg focus:border-blue-300 focus:ring-blue-300"
                  onChange={onChangeHandler}
                  value={part.address}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f4f4f5", display:"flex", justifyContent:"end"}}>
          <button onClick={onClick} className="px-6 py-1 bg-[#6366f1] rounded-md text-white">Save</button>
          <button color="gray" onClick={onClick}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
