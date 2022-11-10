import { useState } from "react";
import SideNav from "../Events/SideNav";
import { checkAuth } from "../api/users";
import { updateUser } from "../api/users";
import { updatePassword } from "../api/users";

export default function Profile() {
  const [editOpen, setEditOpen] = useState({
    visible: false,
  });

  const { user } = checkAuth();
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
  };

  const profileSubmit = async (e) => {
    e.preventDefault();
    if (profile.name.trim().length <= 0 || profile.email.trim().length <= 0) {
      alert("Please make sure name and email are not empty.");
      return;
    }

    await updateUser(profile);
    alert("Profile Updated.");
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
    alert("Password updated.");
  };

  return (
    <div className="flex w-full min-h-screen bg-white bg-right-bottom bg-cover">
      <div className="sticky top-0 w-3/12 bg-gradient-to-tr from-blue-800 to-purple-500">
        <SideNav editOpen={editOpen} setEditOpen={setEditOpen} />
      </div>
      <div className="w-full p-8 px-12 space-y-4 shadow-xl shadow-gray-600">
        <h1 className="my-12 text-5xl font-semibold text-blue-400">
          Edit Profile
        </h1>
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
                onChange={passwordOnChange}
                className="border border-gray-400 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label>New Password</label>
              <input
                type="password"
                name="newPass"
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
