import { useState } from "react";
import { Modal } from "flowbite-react";
import { checkAuth } from "../api/users";
import { uploadEvent } from "../api/events";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";

export default function UploadEvent({ upload, setUpload }) {
  const { user } = checkAuth();
  const { visible } = upload;
  const [invalid, setInvalid] = useState({
    name: false,
    file: false,
  });
  const [newEvent, setNewEvent] = useState({
    name: "",
    uploadBy: user.data.username,
  });

  const { name } = newEvent;
  const [uploadFile, setUploadFile] = useState([]);

  const onClose = () => {
    setNewEvent({ name: "", uploadBy: user.data.username });
    setUploadFile([]);
    setInvalid({ name: false, file: false });
    setUpload({ visible: false });
  };

  //upload file
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { "text/csv": [] },
    onDropAccepted: () => setInvalid({ ...invalid, file: false }),
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
  const queryClient = useQueryClient();

  const uploadMutation = useMutation(
    async ({ uploadFile, newEvent }) => {
      const res = await uploadEvent(uploadFile, newEvent);
      await queryClient.invalidateQueries("events");
      if (res.status === 200) {
        toast.success("New event uploaded.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setUploadFile([]);
        setNewEvent({ ...newEvent, name: "" });
        setUpload({ visible: false });
      }

      if (res.status === 409) {
        toast.error("Event name already exist.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      if (res.status !== 200 && res.status !== 409) {
        toast.error("Something went wrong. Try again later", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
      },
    }
  );

  const uploadSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length <= 0) {
      setInvalid({ ...invalid, name: true });
      return;
    }

    if (isNaN(name.slice(-5)) || name.split(" ").slice(-1).toString().length > 4) {
      setInvalid({ ...invalid, name: true });
      return;
    }

    if (uploadFile.length <= 0) {
      setInvalid({ ...invalid, file: true });
      return;
    }

    uploadMutation.mutate({ uploadFile, newEvent });
  };

  return (
    <>
      <Modal show={visible} size="xl" popup={true} onClose={onClose}>
        <Modal.Header />

        <Modal.Body>
          <div className="">
            <h1 className="mb-4 text-2xl font-semibold text-mediumBlue">
              Upload New Event
            </h1>
            <hr className="h-px mb-6 bg-gray-200 border-0 dark:bg-gray-700" />
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={uploadSubmit}
              className="flex flex-col items-start w-full"
            >
              <input
                type="text"
                value={name}
                name="name"
                placeholder="Event Name"
                className={`w-full rounded-md border-1 ${
                  invalid.name ? "border-red-500 border-2" : ""
                }`}
                onChange={(e) => {
                  setNewEvent({ ...newEvent, name: e.target.value });
                  setInvalid({ ...invalid, name: false });
                }}
              />
              {invalid.name ? (
                <p className="text-sm text-red-500">
                  Event name must contain at least 3 character, one space and
                  ends with 4 numbers. E.g. Eve 2022.
                </p>
              ) : null}

              <div
                {...getRootProps({
                  className:
                    "dropzone w-full border-dashed border-2 border-blue-300 rounded-lg h-60 flex flex-col justify-center items-center space-y-4 my-6",
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
              {invalid.file ? (
                <div className="w-full px-2 py-2 mb-4 text-red-500 bg-red-200 border border-red-500 rounded-md">
                  <span>Select one file to upload.</span>
                </div>
              ) : null}
              <div className="flex justify-end w-full space-x-2">
                <button
                  type="submit"
                  className="px-6 py-1.5 text-white bg-blue-400 rounded-lg hover:bg-blue-500"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-1.5 border border-blue-400 rounded-lg text-blue-400 hover:bg-red-400 hover:text-white hover:border-red-400"
                >
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
