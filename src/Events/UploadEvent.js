import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { uploadEvent } from "../api/events";

export default function UploadEvent({ upload, setUpload }) {
  const { visible } = upload;
  const [newEvent, setNewEvent] = useState({
    name: "",
    uploadBy: "admin",
  });

  const { name } = newEvent;
  const [uploadFile, setUploadFile] = useState([]);

  const onClose = () => {
    setUpload({ visible: false });
  };
  const uploadOnChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const uploadSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length <= 0) {
      alert("Event name cannot be empty");
      return;
    }
    if (uploadFile.length <= 0) {
      alert("Select a file to upload.");
      return;
    }

    const res = await uploadEvent(uploadFile, newEvent);
    if (res) {
      alert("File uploaded!");
      setUploadFile([]);
      setNewEvent({ ...newEvent, name: "" });
      setUpload({ visible: false });
    }
    return;
  };

  return (
    <>
      <Modal show={visible} size="xl" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="">
            <h1 className="mb-6 text-2xl font-semibold text-mediumBlue">
              Upload New Event
            </h1>
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={uploadSubmit}
              className="flex flex-col items-start w-full space-y-6"
            >
              <input
                type="text"
                value={name}
                name="name"
                placeholder="Event Name"
                className="w-full rounded-md borded"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
              />

              <input
                type="file"
                name="csv"
                onChange={uploadOnChange}
                className="w-full border rounded-md"
                accept=".csv"
              />
              <button
                type="submit"
                className="px-4 py-1 text-white rounded-md bg-mediumBlue"
              >
                Upload
              </button>
            </form>
            <div className="flex justify-end">
              <Button color="gray" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
    // <div>
    //   <form encType="multipart/form-data" method="post" onSubmit={uploadSubmit}>
    //     <input
    //       type="text"
    //       value={name}
    //       name="name"
    //       placeholder="Event Name"
    //       className="rounded-md borded"
    //       onChange={(e) => setNewEvent({ name: e.target.value })}
    //     />
    //     <input
    //       type="file"
    //       name="csv"
    //       onChange={uploadOnChange}
    //       className="border rounded-md"
    //       accept=".csv"
    //     />
    //     <button type="submit" className="font-bold">
    //       Upload
    //     </button>
    //   </form>

    // </div>
  );
}
