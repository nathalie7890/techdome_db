import { useState } from "react";
import { useQueryClient } from "react-query";
import DeleteOne from "./DeleteOne";
import { editParticipant } from "../api/participants";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { FiX } from "react-icons/fi";
import { styles } from "./styles/EditPart.styles";

export default function EditParticipant({ edit, editOnChange, setEdit }) {
  const { name, schoolOrg, age, ic, contact, email, address } = edit;

  const [isLoading, setIsLoading] = useState(false); //loader spinner for save btn
  const [deleteOne, setDeleteOne] = useState({
    visible: false,
    id: "",
    name: "",
  });

  const queryClient = useQueryClient();

  const onClose = () => {
    setEdit({ visible: false });
  };

  const editSubmit = async (data, id) => {
    setIsLoading(true);
    const res = await editParticipant(data, id);
    if (res.status === 200) {
      setIsLoading(false);
      toast.success(`${res.message}`);
    }
    await queryClient.invalidateQueries("participants");
    setEdit({ visible: false });
  };

  return (
    <div className={styles.mainContainer}>
      {/* close icon */}
      <div className="flex justify-end">
        <FiX
          className={styles.closeIcon}
          onClick={() => setEdit({ visible: false })}
        />
      </div>
      {/* end of close icon */}
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            editSubmit(
              {
                name,
                schoolOrg,
                age,
                ic,
                contact,
                email,
                address,
              },
              edit.id
            );
          }}
        >
          <div className="space-y-2.5">
            <div className="flex flex-col">
              <label className="text-sm text-white">Name</label>
              <input
                type="text"
                name="name"
                className={styles.formInput}
                onChange={editOnChange}
                value={name}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white">School/Organisation</label>
              <textarea
                type="text"
                name="schoolOrg"
                className={styles.textAreaInput}
                onChange={editOnChange}
                value={schoolOrg}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white">Age</label>
              <input
                type="text"
                name="age"
                className={styles.formInput}
                onChange={editOnChange}
                value={age}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white">IC Number</label>
              <input
                type="text"
                name="ic"
                className={styles.formInput}
                onChange={editOnChange}
                value={ic}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white">Email</label>
              <input
                type="text"
                name="email"
                className={styles.formInput}
                onChange={editOnChange}
                value={email}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white">Contact Number</label>
              <input
                type="text"
                name="contact"
                className={styles.formInput}
                onChange={editOnChange}
                value={contact}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white">Address</label>
              <textarea
                type="text"
                name="address"
                className={styles.textAreaInput}
                onChange={editOnChange}
                value={address}
                rows="2"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className={`${styles.submitBtn} ${
                isLoading ? "pointer-events-none" : ""
              }`}
              type="submit"
            >
              {isLoading ? <Spinner /> : "Save"}
            </button>
            <button
              className={styles.deleteBtn}
              type="button"
              onClick={() =>
                setDeleteOne({ visible: true, id: edit.id, name: name })
              }
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <DeleteOne
        data={deleteOne}
        setDeleteOne={setDeleteOne}
        setEdit={setEdit}
      />
    </div>
  );
}
