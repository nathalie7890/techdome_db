import { useState } from "react";
import { Link } from "react-router-dom";
import { sendResetEmail } from "../api/users";
import { Spinner } from "flowbite-react";
import logo from "../public/images/techdome_logo.png";
import { style } from "./styles/Reset.styles";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [sent, setSent] = useState(false);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await sendResetEmail(email);
    if (res === 404) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    if (res.accepted.length > 0) {
      setSent(true);
      setLoading(false);
    }
  };
  return (
    <div className={style.mainContainer}>
      {/* Tech Dome logo */}
      <div className={style.logoContainer}>
        <img src={logo} alt="" className={style.logoImg} />
        <h1 className={style.logoCaption}>Tech Dome Penang</h1>
      </div>
      {/* end of Tech Dome logo */}

      <div className={style.leftContainer}>
        <div className={style.formContainer}>
          <div className={style.titleContainer}>
            <h1 className={style.title}>Forgot Password?</h1>

            <h1 className={style.subtitle}>
              Enter your registered email to receive password reset instruction.
            </h1>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col text-white">
            {sent ? (
              <h1 className={style.resetLink}>
                We've sent password reset link to your email! 🚀
                <br />
                <span className="text-lg">
                  Note: The link is only valid for 3 hours.
                </span>
              </h1>
            ) : (
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setInvalid(false);
                }}
                className={style.emailInput}
                placeholder="Email"
              />
            )}
            {invalid ? (
              <p className="text-red-300">
                Hmm, we couldn't find any account associated with this email.
                Try a different email?
              </p>
            ) : null}
            {!sent ? (
              <button
                type="submit"
                className={`${style.sendBtn} ${
                  isLoading ? "pointer-events-none" : ""
                }`}
              >
                {isLoading ? (
                  <Spinner
                    color="warning"
                    aria-label="Warning spinner example"
                  />
                ) : (
                  "Send"
                )}
              </button>
            ) : null}
          </form>
          <div className="my-6">
            <Link to="/" className="text-yellow-300 text-start">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
