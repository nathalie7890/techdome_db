import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getWithToken, resetPassword } from "../api/users";
import logo from "../public/images/techdome_logo.png";
import NotFound from "../404";
import { styles } from "./styles/ResetPass.styles";

export default function ResetPass() {
  const [isLoading, setIsLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [reset, setReset] = useState(false);

  const [newPass, setNewPass] = useState({
    id: "",
    password: "",
  });
  const [hidePw, setHidePw] = useState(true);

  const { token } = useParams();

  useEffect(() => {
    const findUser = async (token) => {
      const res = await getWithToken(token);
      if (res.status === 404) {
        return;
      } else {
        setNewPass({ ...newPass, id: res._id });
        setIsLoading(false);
      }
    };
    findUser(token);
  }, [token]);

  const navigate = useNavigate();
  const newPassSubmit = async (e) => {
    e.preventDefault();
    if (newPass.password.trim().length < 8) {
      setInvalid(true);
      return;
    }

    const res = await resetPassword(newPass.id, newPass.password);
    console.log(res);
    if (res === 400) {
      setInvalid(true);
      return;
    }
    setReset(true);
  };

  if (isLoading) {
    return <NotFound />;
  } else
    return (
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="" className={styles.logoImg} />
          <h1 className={styles.logoCaption}>Tech Dome Penang</h1>
        </div>

        {/* reset password form */}
        <div className={styles.formContainer}>
          <div className="mb-16 text-center">
            <h1 className={styles.hasResetCaption}>
              {reset ? "Your password has been reset!" : "Welcome back."}
            </h1>
            <h1 className={styles.enterPwCaption}>
              {reset ? "" : "Enter your new password below."}
            </h1>
          </div>
          {reset ? (
            <button
              onClick={() => {
                navigate("/");
              }}
              className={styles.loginBtn}
            >
              Login
            </button>
          ) : (
            <form onSubmit={newPassSubmit} className="w-full">
              <div className={styles.inputContainer}>
                <input
                  type={hidePw ? "password" : "text"}
                  placeholder="Password"
                  name="password"
                  value={newPass.password}
                  className={styles.pwInput}
                  onChange={(e) => {
                    setNewPass({ ...newPass, password: e.target.value });
                    setInvalid(false);
                  }}
                />
                <div className={styles.eyeIconContainer}>
                  {hidePw ? (
                    <FiEye
                      className={styles.eyeIcon}
                      onClick={() => setHidePw(!hidePw)}
                    />
                  ) : (
                    <FiEyeOff
                      className={styles.eyeIcon}
                      onClick={() => setHidePw(!hidePw)}
                    />
                  )}
                </div>
              </div>
              {invalid ? (
                <p className="text-red-300">
                  Password must contain at least 8 characters.
                </p>
              ) : null}
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </form>
          )}
        </div>
        {/*end of reset password form */}
      </div>
    );
}
