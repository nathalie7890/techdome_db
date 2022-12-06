import { useState } from "react";
import SideNav from "../Partials/SideNav";
import MobileNav from "../Partials/MobileNav";
import { checkAuth, updateUser, updatePassword } from "../api/users";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Alert, Spinner } from "flowbite-react";
import { styles } from "./styles/Profile.style";

export default function Profile() {
  const { user } = checkAuth();
  const navigate = useNavigate();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
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
    setSubmitLoading(true);

    const res = await updateUser(profile);

    if (res.status === 400) {
      if (profile.name.trim().length < 3) {
        setSubmitLoading(false);
        setInvalidInput({ state: true, error: "name", message: res.message });
      } else {
        setSubmitLoading(false);
        setInvalidInput({ state: true, error: "email", message: res.message });
      }
    } else if (res.status === 403) {
      setSubmitLoading(false);
      setInvalidInput({ state: true, error: 403, message: res.message });
    } else {
      setSubmitLoading(false);
      setUpdated(true);
      toast.success("Profile updated.");
    }
  };

  const passwordOnChange = (e) => {
    setInvalidPass({ state: false, error: "", message: "" });
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updatePassSubmit = async (e) => {
    e.preventDefault();
    setPassLoading(true);

    const res = await updatePassword(password);
    if (res.status === 409) {
      setPassLoading(false);
      setInvalidPass({ state: true, error: 409, message: res.message });
    } else if (res.status === 400) {
      setPassLoading(false);
      setInvalidPass({ state: true, error: 400, message: res.message });
    } else {
      setPassLoading(false);
      toast.success("Password updated.");
      setPassword({ oldPass: "", newPass: "" });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <MobileNav />
      <div className={styles.secondContainer}>
        <div className={styles.sideNavContainer}>
          <SideNav editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
        <div className="w-full p-8 px-12 space-y-4">
          <h1 className={styles.pageTitle}>Edit Profile</h1>

          {/* alert */}
          <div className="md:w-2/3">
            {updated ? (
              <Alert
                color="info"
                additionalContent={
                  <>
                    <div className={styles.alertCaption}>
                      Login again to see your recent changes.
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate("/");
                        }}
                        type="button"
                        className={styles.alertLogoutBtn}
                      >
                        Logout Now
                      </button>
                      <button
                        onClick={() => setUpdated(false)}
                        type="button"
                        className={styles.alertLaterBtn}
                      >
                        Later
                      </button>
                    </div>
                  </>
                }
              >
                <h3 className={styles.alertTitle}>Profile updated.</h3>
              </Alert>
            ) : null}
          </div>
          {/* end of alert */}
          <div className="md:space-x-6 md:flex">
            {/* profile form */}
            <form className={styles.profileForm} onSubmit={profileSubmit}>
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
                  className={styles.nameInput}
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
                <button
                  type="submit"
                  className={`${styles.saveBtn} ${
                    submitLoading ? "pointer-events-none" : ""
                  }`}
                >
                  {submitLoading ? <Spinner /> : "Save"}
                </button>
              </div>
            </form>
            {/* end of profile form */}

            {/* password form */}
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
                  className={`${styles.updatePwBtn} ${
                    passLoading ? "pointer-events-none" : ""
                  }`}
                >
                  {passLoading ? <Spinner /> : "Update Password"}
                </button>
              </div>
            </form>
            {/* end of password form */}
          </div>
        </div>
      </div>
    </div>
  );
}
