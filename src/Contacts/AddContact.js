import { useState } from "react";
import { useQueryClient } from "react-query";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "../api/users";
import { Modal, Alert } from "flowbite-react";
import { toast } from "react-toastify";

export default function AddContact({ addUser, setAddUser }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [invalid, setInvalid] = useState(false);
  const [addFail, setAddFail] = useState(false);
  const [hidePw, setHidePw] = useState(true);
  const registerOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setInvalid(false);
  };

  const queryClient = useQueryClient();
  const registerSubmit = async () => {
    const res = await register(user);
    await queryClient.invalidateQueries("users");
    if (res.status === 409) {
      setAddFail(true);
      return;
    }

    if (res.status === 400) {
      setInvalid(true);
      return;
    }

    setUser({
      name: "",
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    });

    setAddUser(false);
    toast.success("New user added.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  };

  const onClose = () => {
    setInvalid(false);
    setAddFail(false);
    setUser({
      name: "",
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    });
    setAddUser(false);
  };
  return (
    <div>
      <Modal show={addUser} size="lg" onClose={onClose}>
        <Modal.Header>New User</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col w-full space-y-2 text-black">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={registerOnChange}
              placeholder="Name"
              className="border border-gray-500 rounded-lg focus:ring-blue-400"
            />

            <input
              type="text"
              name="username"
              value={user.username}
              onChange={registerOnChange}
              placeholder="Username"
              className="border border-gray-500 rounded-lg focus:ring-blue-400"
            />

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={registerOnChange}
              placeholder="Email"
              className="border border-gray-500 rounded-lg focus:ring-blue-400"
            />

            <div className="flex border border-gray-500 rounded-lg">
              <input
                type={hidePw ? "password" : "text"}
                name="password"
                value={user.password}
                onChange={registerOnChange}
                placeholder="Password"
                className="w-10/12 bg-transparent border-0 rounded-full focus:ring-0 focus:border-none"
              />
              <div className="flex flex-col items-center justify-center w-2/12">
                {hidePw ? (
                  <FiEye
                    className="text-xl text-gray-500 hover:text-white hover:cursor-pointer"
                    onClick={() => setHidePw(!hidePw)}
                  />
                ) : (
                  <FiEyeOff
                    className="text-xl text-gray-500 hover:text-white hover:cursor-pointer"
                    onClick={() => setHidePw(!hidePw)}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-purple-500">Role</label>
              <select
                name="isAdmin"
                value={user.isAdmin}
                onChange={registerOnChange}
                className="text-purple-500 bg-purple-100 border-2 border-purple-500 rounded-lg focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="true" className="bg-white">
                  Admin
                </option>
                <option value="false" className="bg-white">
                  Non-Admin
                </option>
              </select>
            </div>
            {addFail ? (
              <Alert color="failure">
                <span>Username or Email has been taken.</span>
              </Alert>
            ) : (
              <Alert
                color={`${invalid ? "failure" : "info"}`}
                additionalContent={
                  <div>
                    <div
                      className={`mt-2 mb-4 text-sm ${
                        invalid ? "text-red-500" : "text-blue-700"
                      }`}
                    >
                      <ul
                        className={`mt-1.5 ml-4 list-disc list-inside ${
                          invalid ? "text-red-500" : "text-blue-700"
                        }`}
                      >
                        <li>
                          Name and Username must contain at least 3 characters
                        </li>
                        <li>Spaces are not allowed in all input except Name</li>
                        <li>Password must contain at least 8 characters</li>
                      </ul>
                    </div>
                  </div>
                }
              >
                <h3
                  className={`text-lg font-medium  ${
                    invalid ? "text-red-500" : "text-blue-700"
                  }`}
                >
                  Make sure these requirements are fulfilled
                </h3>
              </Alert>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full space-x-2">
            <button
              onClick={registerSubmit}
              className="px-6 py-1.5 text-white bg-blue-400 rounded-lg hover:bg-blue-500"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="px-6 py-1.5 border border-blue-400 rounded-lg text-blue-400 hover:bg-red-400 hover:text-white hover:border-red-400"
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
