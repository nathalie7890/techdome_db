import { useState } from "react";
import { Modal } from "flowbite-react";
import { uploadEvent } from "../api/events";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function UploadEvent({ upload, setUpload }) {
  const { visible } = upload;
  const [newEvent, setNewEvent] = useState({
    name: "",
    uploadBy: "admin",
  });

  const { name } = newEvent;
  const [uploadFile, setUploadFile] = useState([]);

  const onClose = () => {
    setUploadFile([]);
    setUpload({ visible: false });
  };

  //upload file
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { "text/csv": [] },
    onDrop: (acceptedFiles) => {
      setUploadFile(acceptedFiles[0]);
    },
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // const uploadOnChange = (e) => {
  //   setUploadFile(e.target.files[0]);
  // };

  const uploadSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length <= 0) return alert("Event name cannot be empty");

    if (isNaN(name.slice(-5)))
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
      <Modal show={visible} size="2xl" popup={true} onClose={onClose}>
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
              <div
                {...getRootProps({
                  className:
                    "dropzone w-full border-dashed border-2 border-blue-300 rounded-lg h-60 flex flex-col justify-center items-center space-y-4",
                })}
              >
                <AiOutlineCloudUpload className="text-blue-500 text-7xl" />
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                  {uploadFile.length <= 0 ? (
                    <p className="dropzone-content">
                      Drag n drop some files here, or click to select files
                    </p>
                  ) : (
                    <aside>
                      <ul>{files}</ul>
                    </aside>
                  )}
                </div>
              </div>
              <div className="flex justify-end w-full space-x-2">
                <button
                  type="submit"
                  className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-300 hover:border-darkBlue hover:border hover:text-darkBlue"
                >
                  Upload
                </button>
                <button type="button" onClick={onClose} className="px-4 py-1 border rounded-md border-darkBlue hover:bg-blue-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>

    //upload file input
    //   <input
    //   type="file"
    //   name="csv"
    //   onChange={uploadOnChange}
    //   className="w-full border rounded-md"
    //   accept=".csv"
    // />

    // <div className="flex items-center justify-center w-full">
    //   <label
    //     htmlFor="dropzone-file"
    //     className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
    //   >
    //     <div className="flex flex-col items-center justify-center pt-5 pb-6">
    //       <svg
    //         className="w-10 h-10 mb-3 text-gray-400"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="2"
    //           d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    //         ></path>
    //       </svg>
    //       {uploadFile.length <= 0 ? (
    //         <>
    //           <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
    //             <span className="font-semibold">Click to upload</span>{" "}
    //             or drag and drop
    //           </p>

    //         </>
    //       ) : (
    //         <>
    //           <h1>{uploadFile.name}</h1>
    //           <h1>{uploadFile.size} kb</h1>
    //         </>
    //       )}
    //     </div>
    //     <input
    //       id="dropzone-file"
    //       type="file"
    //       className="hidden"
    //       name="csv"
    //       accept=".csv"
    //       onChange={uploadOnChange}
    //     />
    //   </label>
    // </div>

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
