import { useState } from "react";
import { Modal, Spinner } from "flowbite-react";
import { updateEvent } from "../api/events";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

export default function AddPart({ addPart, setAddPart }) {
  const { visible, name } = addPart;
  const queryClient = useQueryClient();
  
  const [invalid, setInvalid] = useState({
    name: false,
    file: false,
  });
  
  const [isLoading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);

  const onClose = () => {
    setUploadFile([]);
    setInvalid({ name: false, file: false });
    setAddPart({ ...addPart, visible: false });
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

  const uploadSubmit = async (e) => {
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
    
    setLoading(true);
    
    const res = await updateEvent(uploadFile, name);
    queryClient.invalidateQueries("participants");
    
    setLoading(false)
    
    if (res.status === 200) {
      toast.success(`${name} updated.`, {
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
      setAddPart({ ...addPart, visible: false });
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
  };

  return (
    <>
      <Modal show={visible} size="xl" popup={true} onClose={onClose}>
        <Modal.Header />

        <Modal.Body>
          <div className="">
            <h1 className="mb-4 text-2xl font-semibold text-gray-600">
              Add Participants
            </h1>

            <hr className="h-px mb-6 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="w-full px-2 py-2 my-4 text-blue-500 bg-blue-100 border border-blue-600 rounded-md">
              <h1>{name}</h1>
            </div>
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={uploadSubmit}
              className="flex flex-col items-start w-full"
            >
              <div
                {...getRootProps({
                  className:
                    "dropzone w-full border-dashed border-2 border-blue-300 rounded-lg h-60 flex flex-col justify-center items-center space-y-4 mb-4",
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
              ) : null}{" "}
              <div className="flex justify-end w-full mt-4 space-x-2">
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
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
