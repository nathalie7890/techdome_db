import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginFn } from "../api/users";
import { styles } from "./styles/Login.styles";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import logo from "../public/images/techdome_logo.png";

export default function Login() {
  const [hidePw, setHidePw] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginFn(user);

    if (res.status === 400 || res.status === 228) {
      setLoading(false);
      setLoginFail(true);
    } else {
      setLoading(false);
      toast.success("Welcome back!");
      navigate("/events");
    }
  };

  const loginOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setLoginFail(false);
  };

  return (
    <div className={styles.mainContainer}>
      {/* Tech Dome logo */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="" className={styles.logoImg} />
        <h1 className={styles.logoCaption}>Tech Dome Penang</h1>
      </div>
      {/* End of Tech Dome logo */}

      {/* login form */}
      <div className={styles.leftContainer}>
        <div className={styles.formContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Dashboard</h1>
            <h1 className={styles.subtitle}>
              <span className={styles.subtitleSpan}>Hello</span>, login to your
              account.
            </h1>
          </div>
          <form onSubmit={loginSubmit} className={styles.form}>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={loginOnChange}
              className={styles.emailInput}
              placeholder="Username"
              required
            />
            <div className={styles.pwInputContainer}>
              <input
                type={hidePw ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={loginOnChange}
                className={styles.pwInput}
                required
              />
              <div className={styles.eyeContainer}>
                {hidePw ? (
                  <FiEye
                    className={styles.eyeOpen}
                    onClick={() => setHidePw(!hidePw)}
                  />
                ) : (
                  <FiEyeOff
                    className={styles.eyeClose}
                    onClick={() => setHidePw(!hidePw)}
                  />
                )}
              </div>
            </div>
            {loginFail ? (
              <div className={styles.loginErrorContainer}>
                <AiOutlineExclamationCircle className="inline" />
                <h1>Did you enter the correct username and password?</h1>
              </div>
            ) : null}
            <button
              type="submit"
              className={`${styles.submitBtn} + ${
                isLoading ? "pointer-events-none" : ""
              }`}
            >
              {isLoading ? (
                <Spinner color="warning" aria-label="Warning spinner example" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="my-6">
            <Link to="/reset" className={styles.forgotPw}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      {/* End of login form */}
    </div>
  );
}
