import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { changeRole } from "../api/users";
import DeleteOne from "./DeleteOne";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { styles } from "./styles/EditContact.styles";

export default function EditContact({
  editOpen,
  setEditOpen,
  roleChange,
  setRoleChange,
}) {
  const { visible, name } = editOpen;
  const { id, role } = roleChange;
  const [deleteOne, setDeleteOne] = useState({ visible: "", id: "", name: "" });

  const queryClient = useQueryClient();
  const roleMutation = useMutation(
    async ({ id, role }) => {
      await changeRole(id, role);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("users");
        toast.success("User role changed");
        setEditOpen(false);
      },
    }
  );

  const roleChangeSubmit = (id, role) => {
    roleMutation.mutate({ id, role });
  };

  return (
    <div className={styles.mainContainer}>
      <div className="flex justify-end">
        <FiX
          className={styles.closeIcon}
          onClick={() => setEditOpen({ visible: false })}
        />
      </div>
      <div>
        <h1 className={styles.contactName}>{name}</h1>
      </div>
      <div className="flex flex-col h-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            roleChangeSubmit(id, role);
          }}
          className="flex flex-col h-2/3"
        >
          <div className="flex flex-col mb-20">
            <label className="text-sm text-white">Role</label>
            <select
              type="text"
              className={styles.roleSelect}
              name="role"
              value={role}
              onChange={(e) =>
                setRoleChange({ ...roleChange, role: e.target.value })
              }
            >
              <option value="true" className="text-black">
                Admin
              </option>
              <option value="false" className="text-black">
                Non-Admin
              </option>
            </select>
            <button
              type="button"
              onClick={() => setDeleteOne({ visible: true, id, name })}
              className={styles.deleteBtn}
            >
              Delete User
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={styles.saveBtn}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <DeleteOne
        deleteOne={deleteOne}
        setDeleteOne={setDeleteOne}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
}
