import { useState } from "react";
import { useQueryClient } from "react-query";
import SideNav from "../Events/SideNav";
import BottomNav from "../Partials/BottomNav";
import { checkAuth, getUser, updateUser, updatePassword } from "../api/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert } from "flowbite-react";
import "./profile.css";

export default function Profile() {
  const { user } = checkAuth();
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const [editOpen, setEditOpen] = useState({
    visible: false,
  });

  const [profile, setProfile] = useState({
    name: user.data.name,
    email: user.data.email,
  });

  const [password, setPassword] = useState({
    oldPass: "",
    newPass: "",
  });

  const onChangeHandler = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setUpdated(false);
    setInvalidInput({ state: false, error: "", message: "" });
  };

  const [invalidPass, setInvalidPass] = useState({
    state: false,
    error: "",
    message: "",
  });

  const [invalidInput, setInvalidInput] = useState({
    state: false,
    error: "",
    message: "",
  });

  const profileSubmit = async (e) => {
    e.preventDefault();

    const res = await updateUser(profile);
    console.log(res);
    if (res.status === 400) {
      if (profile.name.trim().length < 3)
        setInvalidInput({ state: true, error: "name", message: res.message });
      else
        setInvalidInput({ state: true, error: "email", message: res.message });
    } else if (res.status === 403)
      setInvalidInput({ state: true, error: 403, message: res.message });
    else {
      setUpdated(true);
      toast.success("Profile updated.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-message",
        theme: "light",
      });
    }
  };

  const passwordOnChange = (e) => {
    setInvalidPass({ state: false, error: "", message: "" });
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updatePassSubmit = async (e) => {
    e.preventDefault();

    const res = await updatePassword(password);
    if (res.status === 409) {
      setInvalidPass({ state: true, error: 409, message: res.message });
    } else if (res.status === 400) {
      setInvalidPass({ state: true, error: 400, message: res.message });
    } else {
      toast.success("Password updated.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPassword({ oldPass: "", newPass: "" });
    }
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex w-full min-h-screen bg-left bg-cover bg-profile">
        <div className="sticky top-0 hidden w-3/12 bg-gradient-to-tr from-blue-800 to-purple-500 md:block">
          <SideNav editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
        <div className="w-full p-8 px-12 space-y-4">
          <h1 className="my-12 pageTitle">Edit Profile</h1>
          <div className="md:w-2/3">
            {updated ? (
              <Alert
                color="info"
                additionalContent={
                  <>
                    <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
                      Login again to see your recent changes.
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate("/");
                        }}
                        type="button"
                        className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900"
                      >
                        Logout Now
                      </button>
                      <button
                        onClick={() => setUpdated(false)}
                        type="button"
                        className="rounded-lg border border-blue-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 dark:border-blue-800 dark:text-blue-800 dark:hover:text-white"
                      >
                        Later
                      </button>
                    </div>
                  </>
                }
              >
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-800">
                  Profile updated.
                </h3>
              </Alert>
            ) : null}
          </div>
          <div className="md:space-x-6 md:flex">
            <form
              className="mb-8 space-y-4 md:w-1/3 md:mb-0"
              onSubmit={profileSubmit}
            >
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className={`border  ${
                    invalidInput.error === "name"
                      ? "border-red-500"
                      : "border-gray-400"
                  } rounded-lg`}
                  onChange={onChangeHandler}
                  value={profile.name}
                />
              </div>

              <div className="flex flex-col">
                <label>Username</label>
                <input
                  disabled
                  type="text"
                  name="username"
                  className="italic bg-blue-100 border border-gray-400 rounded-lg"
                  value={user.data.username}
                />
              </div>

              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`border  ${
                    invalidInput.error === "email" || invalidInput.error === 403
                      ? "border-red-500"
                      : "border-gray-400"
                  } rounded-lg`}
                  onChange={onChangeHandler}
                  value={profile.email}
                />
              </div>
              {invalidInput.state ? (
                <Alert color="failure">
                  <span>{invalidInput.message}</span>
                </Alert>
              ) : null}
              <div className="">
                <button type="submit" className="mediumBlueBtn">
                  Save
                </button>
              </div>
            </form>
            <form className="space-y-4 md:w-1/3" onSubmit={updatePassSubmit}>
              <div className="flex flex-col">
                <label>Current Password</label>
                <input
                  type="password"
                  name="oldPass"
                  value={password.oldPass}
                  onChange={passwordOnChange}
                  className={`border  ${
                    invalidPass.error === 409
                      ? "border-red-500"
                      : "border-gray-400"
                  } rounded-lg`}
                />
              </div>
              <div className="flex flex-col">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPass"
                  value={password.newPass}
                  onChange={passwordOnChange}
                  className={`border ${
                    invalidPass.error === 400
                      ? "border-red-500"
                      : "border-gray-400"
                  } rounded-lg`}
                />
              </div>
              {invalidPass.state ? (
                <Alert color="failure">
                  <span>{invalidPass.message}</span>
                </Alert>
              ) : null}
              <div className="flex">
                <button
                  type="submit"
                  className="px-6 py-1.5 text-white bg-purple-500 rounded-lg md:my-6 hover:bg-purple-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 h-16 bg-gradient-to-tr from-[#3f51b5] to-purple-500 md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
