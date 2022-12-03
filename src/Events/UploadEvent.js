import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "flowbite-react";
import { uploadEvent } from "../api/events";
import { useDropzone } from "react-dropzone";
import { useQueryClient, useMutation } from "react-query";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { styles } from "./styles/UploadEvent.styles";

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
        toast.success("New event uploaded.");
        setUploadFile([]);
        setNewEvent({ ...newEvent, name: "" });
        setUpload({ visible: false });
      }

      if (res.status === 409) {
        toast.error("Event name already exist.");
      }

      if (res.status !== 200 && res.status !== 409) {
        toast.error("Something went wrong. Try again later");
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
          <h1 className={styles.title}>Upload New Event</h1>
          <div>
            <hr className={styles.hr} />
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={uploadSubmit}
              className={styles.formContainer}
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

              {/* drag and drop input */}
              <div
                {...getRootProps({
                  className: styles.dragNDrop,
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
              {/* end of drag and drop input */}

              {invalid.file ? (
                <div className={styles.invalidFileWarning}>
                  <span>Select one file to upload.</span>
                </div>
              ) : null}

              {/* sample csv download link, submit and cancel btns */}
              <div className={styles.footer}>
                <Link
                  to="/sample.csv"
                  target="_blank"
                  download
                  className="text-blue-500 underline"
                >
                  Download Sample CSV
                </Link>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className={`${styles.uploadBtn} ${
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
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {/* end of sample csv download link, submit and cancel btns */}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
