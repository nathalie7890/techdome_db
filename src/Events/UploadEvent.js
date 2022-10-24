import { useState } from "react";
import { uploadEvent } from "../api/events";

export default function UploadEvent() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    uploadBy: "admin",
  });

  const { name } = newEvent;
  const [uploadFile, setUploadFile] = useState([]);
  const [hasUpload, setHasUpload] = useState(false);

  const uploadOnChange = (e) => {
    setUploadFile(e.target.files[0]);
    setHasUpload(true);
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

    setNewEvent({ ...newEvent, name, uploadBy: "admin" });
    const res = await uploadEvent(uploadFile, newEvent);
    if (res) {
      alert("File uploaded!");
      setUploadFile([]);
      e.target.reset();
    }
    return;
  };

  return (
    <div>
      <form encType="multipart/form-data" method="post" onSubmit={uploadSubmit}>
        <input
          type="text"
          value={name}
          name="name"
          placeholder="Event Name"
          className="rounded-md borded"
          onChange={(e) => setNewEvent({ name: e.target.value })}
        />
        <input
          type="file"
          name="csv"
          onChange={uploadOnChange}
          className="border rounded-md"
          accept=".csv"
        />
        <button type="submit" className="font-bold">
          Upload
        </button>
      </form>
      {hasUpload ? (
        <>
          <p>Filename: {uploadFile.name}</p>
          <p>Filesize: {uploadFile.size}kb</p>
        </>
      ) : null}
    </div>
  );
}
