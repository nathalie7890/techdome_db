import { useState } from "react";
import SideNav from "../Events/SideNav";
import { checkAuth } from "../api/users";
import { updateUser } from "../api/users";
import { updatePassword } from "../api/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert } from "flowbite-react";

export default function Profile() {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState({
    visible: false,
  });

  let { user } = checkAuth();
  const [profile, setProfile] = useState({
    name: user.data.name,
    email: user.data.email,
  });

  const [password, setPassword] = useState({
    oldPass: "",
    newPass: "",
  });

  const [updated, setUpdated] = useState(false);
  const onChangeHandler = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const profileSubmit = async (e) => {
    e.preventDefault();
    if (profile.name.trim().length <= 0 || profile.email.trim().length <= 0) {
      alert("Please make sure name and email are not empty.");
      return;
    }

    await updateUser(profile);
    setUpdated(true);
  };

  const passwordOnChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const updatePassSubmit = async (e) => {
    e.preventDefault();
    if (
      password.oldPass.trim().length <= 0 ||
      password.newPass.trim().length <= 0
    ) {
      alert("Please make sure passwords are not empty.");
      return;
    }
    await updatePassword(password);
    setPassword({ oldPass: "", newPass: "" });
    toast.success("Password changed.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="flex w-full min-h-screen bg-left bg-cover bg-profile">
      <div className="sticky top-0 w-3/12 bg-gradient-to-tr from-blue-800 to-purple-500">
        <SideNav editOpen={editOpen} setEditOpen={setEditOpen} />
      </div>
      <div className="w-full p-8 px-12 space-y-4">
        <h1 className="my-12 text-5xl font-semibold text-blue-400">
          Edit Profile
        </h1>
        <div className="w-2/3">
          {updated ? (
            <Alert
              color="info"
              additionalContent={
                <>
                  <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
                    Logout and login again to see your recent changes.
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
        <div className="flex space-x-6">
          <form className="w-1/3 space-y-4" onSubmit={profileSubmit}>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="border border-gray-400 rounded-lg "
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
                className="w-full border border-gray-400 rounded-lg"
                onChange={onChangeHandler}
                value={profile.email}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="px-6 py-1.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
          <form className="w-1/3 space-y-4" onSubmit={updatePassSubmit}>
            <div className="flex flex-col">
              <label>Current Password</label>
              <input
                type="password"
                name="oldPass"
                value={password.oldPass}
                onChange={passwordOnChange}
                className="border border-gray-400 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label>New Password</label>
              <input
                type="password"
                name="newPass"
                value={password.newPass}
                onChange={passwordOnChange}
                className="border border-gray-400 rounded-lg"
              />
            </div>
            <div className="flex ">
              <button
                type="submit"
                className="px-6 py-1.5 text-white bg-purple-500 rounded-lg my-6 hover:bg-purple-700"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
