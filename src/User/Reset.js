import { useState } from "react";
import { Link } from "react-router-dom";
import { sendResetEmail } from "../api/users";
import { Spinner } from "flowbite-react";
import logo from "../public/images/techdome_logo.png";

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
    <div className="relative w-full h-screen bg-no-repeat bg-cover bg-landing">
      <div className="absolute flex items-end space-x-2 top-5 left-10 ">
        <img src={logo} alt="" className="w-8 h-8 animate-pulse" />
        <h1 className="text-lg text-blue-200 uppercase">Tech Dome Penang</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-8 lg:w-1/2 lg:px-0">
        <div className="w-full px-6 py-6 shadow-xl md:py-16 sm:w-1/2 md:px-8 xl:px-12 lg:w-2/3 rounded-xl h-fit bg-black/40 shadow-black/50">
          <div className="mb-10 lg:mb-16 sm:space-y-4">
            <h1 className="text-4xl font-bold text-yellow-200 md:text-5xl xl:text-6xl">
              Forgot Password?
            </h1>

            <h1 className="p-1 mb-10 text-lg text-blue-100 sm:text-xl xl:text-3xl">
              Enter your registered email to receive password reset instruction.
            </h1>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col text-white">
            {sent ? (
              <h1 className="text-2xl font-semibold text-blue-300">
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
                className="my-1 bg-transparent border-white rounded-full placeholder:text-white focus:border-yellow-200 focus:ring-yellow-200"
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
                className={`py-2 mt-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 sm:py-2.5 text-white ${
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
