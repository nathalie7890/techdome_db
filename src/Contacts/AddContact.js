import { useState } from "react";
import { useQueryClient } from "react-query";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "../api/users";
import { Modal, Alert, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { style } from "./styles/AddContact.styles";

export default function AddContact({ addUser, setAddUser }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [isLoading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [addFail, setAddFail] = useState(false);
  const [hidePw, setHidePw] = useState(true);
  const registerOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setInvalid(false);
  };

  const queryClient = useQueryClient();
  const registerSubmit = async () => {
    setLoading(true);
    const res = await register(user);
    await queryClient.invalidateQueries("users");
    if (res.status === 409) {
      setLoading(false);
      setAddFail(true);
      return;
    }

    if (res.status === 400) {
      setLoading(false);
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
    toast.success("New user added.");
    setLoading(false);
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
          <form className={style.form}>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={registerOnChange}
              placeholder="Name"
              className={style.input}
            />

            <input
              type="text"
              name="username"
              value={user.username}
              onChange={registerOnChange}
              placeholder="Username"
              className={style.input}
            />

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={registerOnChange}
              placeholder="Email"
              className={style.input}
            />

            <div className={style.pwInputContainer}>
              <input
                type={hidePw ? "password" : "text"}
                name="password"
                value={user.password}
                onChange={registerOnChange}
                placeholder="Password"
                className={style.pwInput}
              />
              <div className={style.eyeIconContainer}>
                {hidePw ? (
                  <FiEye
                    className={style.eyeIcon}
                    onClick={() => setHidePw(!hidePw)}
                  />
                ) : (
                  <FiEyeOff
                    className={style.eyeIcon}
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
                className={style.adminSelect}
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
          <div className={style.footer}>
            <button
              onClick={registerSubmit}
              className={`${style.submitBtn} ${
                isLoading ? "pointer-events-none" : ""
              }`}
            >
              {isLoading ? <Spinner /> : "Save"}
            </button>
            <button onClick={onClose} className={style.cancelBtn}>
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
