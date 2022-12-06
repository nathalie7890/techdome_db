import { useState } from "react";
import { Modal, Spinner } from "flowbite-react";
import { updateEvent } from "../api/events";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { styles } from "./styles/AddPart.styles";

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

    setLoading(false);

    if (res.status === 200) {
      toast.success(`${name} updated.`);
      setUploadFile([]);
      setAddPart({ ...addPart, visible: false });
    }
    if (res.status !== 200 && res.status !== 409) {
      toast.error("Something went wrong. Try again later");
    }
  };

  return (
    <>
      <Modal show={visible} size="xl" popup={true} onClose={onClose}>
        <Modal.Header />

        <Modal.Body>
          <div className="">
            <h1 className={styles.title}>Add Participants</h1>

            <hr className={styles.hr} />
            <div className={styles.eventName}>
              <h1>{name}</h1>
            </div>
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={uploadSubmit}
              className={styles.form}
            >
              {/* drag and drop */}
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
              {/*end of drag and drop */}
              {invalid.file ? (
                <div className={styles.invalidFile}>
                  <span>Select one file to upload.</span>
                </div>
              ) : null}{" "}
              <div className={styles.footer}>
                <button
                  type="submit"
                  className={`${styles.submitBtn} ${
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
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
