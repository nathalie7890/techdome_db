import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AddParticipant } from "../api/participants";
import { Modal, Button } from "flowbite-react";

export default function Add({ add, setAdd }) {
  const { visible } = add;
  const [data, setData] = useState({
    event: "",
    name: "",
    schoolOrg: "",
    ic: "",
    email: "",
    contact: "",
    age: "",
  });

  const [added, setAdded] = useState(false);

  const addOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    async (data) => {
      await AddParticipant(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("participants");
        setAdded(true);
      },
    }
  );

  const addSubmit = (data) => {
    const participant = {
      Event: data.event,
      Name: data.name,
      "School/Organisation": data.schoolOrg.toUpperCase(),
      "IC Number": data.ic,
      Email: data.email,
      "Contact number": data.contact,
      age: data.age,
    };

    addMutation.mutate(participant);
  };

  return (
    <>
      <Modal
        show={visible}
        size="2xl"
        popup={true}
        onClose={() => {
          setAdded(false);
          setData({});
          setAdd({ visible: false });
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h1 className="mb-12 text-3xl font-semibold text-left text-mediumBlue">
              Add Participant
            </h1>
            {added ? (
              <>
                <h1 className="mb-12 text-2xl font-semibold text-black">Participant added</h1>
                <button
                  color="gray"
                  type="button"
                  onClick={() => {
                    setAdded(false);
                    setData({});
                    setAdd({ visible: false });
                  }}
                  className="px-4 py-2 border rounded-md border-darkBlue text-darkBlue"
                >
                  Ok
                </button>
              </>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  addSubmit(data);
                }}
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="event"
                    placeholder="Event"
                    className="w-full addPartInput inputFocus"
                    value={data.event}
                    onChange={addOnChange}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full capitalize addPartInput inputFocus"
                    value={data.name}
                    onChange={addOnChange}
                  />
                </div>
                <input
                  type="text"
                  name="schoolOrg"
                  placeholder="School/Organisation"
                  className="w-full addPartInput inputFocus"
                  value={data.schoolOrg}
                  onChange={addOnChange}
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="ic"
                    placeholder="IC Number"
                    className="w-full addPartInput inputFocus"
                    value={data.ic}
                    onChange={addOnChange}
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="age"
                    className="w-full addPartInput inputFocus"
                    value={data.age}
                    onChange={addOnChange}
                  />
                </div>{" "}
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    className="w-full addPartInput inputFocus"
                    value={data.contact}
                    onChange={addOnChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full addPartInput inputFocus"
                    value={data.email}
                    onChange={addOnChange}
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white rounded-md bg-darkBlue"
                  >
                    Confirm
                  </button>
                  <button
                    color="gray"
                    type="button"
                    onClick={() => {
                      setAdded(false);
                      setData({});
                      setAdd({ visible: false });
                    }}
                    className="px-4 py-2 border rounded-md border-darkBlue text-darkBlue"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
