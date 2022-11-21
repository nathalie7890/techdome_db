import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "flowbite-react";
import { uploadEvent } from "../api/events";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";

export default function UploadEvent({ upload, setUpload }) {
  const { visible } = upload;
  const queryClient = useQueryClient();

  const [invalid, setInvalid] = useState({
    name: false,
    file: false,
  });
  const [newEvent, setNewEvent] = useState({
    name: "",
  });

  const [isLoading, setLoading] = useState(false);
  const { name } = newEvent;
  const [uploadFile, setUploadFile] = useState([]);

  const onClose = () => {
    setNewEvent({ name: "" });
    setUploadFile([]);
    setInvalid({ name: false, file: false });
    setUpload({ visible: false });
  };

  //drag and drop
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

  const uploadMutation = useMutation(
    async ({ uploadFile, newEvent }) => {
      setLoading(true);

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
          theme: "light",
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
          theme: "light",
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
          theme: "light",
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
        setLoading(false);
      },
    }
  );

  const uploadSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length <= 0) {
      setInvalid({ ...invalid, name: true });
      return;
    }

    if (
      isNaN(name.slice(-5)) ||
      name.split(" ").slice(-1).toString().length > 4
    ) {
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
            <h1 className="mb-4 text-2xl font-semibold text-gray-600">
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
              <div className="flex items-end justify-between w-full">
                <Link to="/sample.csv" target="_blank" download className="text-blue-500 underline">
                  Download Sample CSV
                </Link>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className={`px-6 py-1.5 text-white bg-blue-400 rounded-lg hover:bg-blue-500 ${
                      isLoading ? "pointer-events-none" : ""
                    }`}
                  >
                    {isLoading ? (
                      <Spinner
                        color="warning"
                        aria-label="Warning spinner example"
                      />
                    ) : (
                      "Upload"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-1.5 border border-blue-400 rounded-lg text-blue-400 hover:bg-red-400 hover:text-white hover:border-red-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
