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
  // const uploadOnChange = (e) => {
  //   setUploadFile(e.target.files[0]);
  // };

  const uploadOnChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const uploadSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length <= 0) return alert("Event name cannot be empty");

    if (isNaN(name.slice(-4)))
      return alert("Event name must end with year(4 digits).");
      
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

              {/* <input
                type="file"
                name="csv"
                onChange={uploadOnChange}
                className="w-full border rounded-md"
                accept=".csv"
              /> */}

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="csv"
                    accept=".csv"
                    onChange={uploadOnChange}
                  />
                </label>
              </div>

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
