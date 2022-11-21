import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { changeRole } from "../api/users";
import DeleteOne from "./DeleteOne";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

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
        toast.success("User role changed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditOpen(false);
      },
    }
  );

  const roleChangeSubmit = (id, role) => {
    roleMutation.mutate({ id, role });
  };

  return (
    <div className="sticky top-0 right-0 flex flex-col h-screen p-8">
      <div className="flex justify-end">
        <AiOutlineClose
          className="text-2xl text-white rounded-md hover:text-yellow-200"
          onClick={() => setEditOpen({ visible: false })}
        />
      </div>
      <div>
        <h1 className="my-24 text-4xl font-semibold text-white">{name}</h1>
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
              className="mt-2 mb-6 text-white bg-transparent border-white rounded-md focus:border-white focus:ring-white"
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
              className="flex justify-start font-semibold text-yellow-200 w-fit hover:text-red-400"
            >
              Delete User
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-800 rounded-md w-fit hover:bg-blue-900"
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
