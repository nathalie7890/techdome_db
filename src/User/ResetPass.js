import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getWithToken, resetPassword } from "../api/users";
import logo from "../public/images/techdome_logo.png";
import NotFound from "../404";

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
      <div className="relative flex flex-col items-center justify-center h-screen bg-cover lg:bg-right bg-resetPass">
        <div className="absolute flex items-end space-x-2 top-5 left-10 ">
          <img src={logo} alt="" className="w-8 h-8 animate-pulse" />
          <h1 className="text-lg text-blue-200 uppercase">Tech Dome Penang</h1>
        </div>

        <div className="flex flex-col items-center justify-center xl:w-1/4">
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-bold text-yellow-200">
              {reset ? "Your password has been reset!" : "Welcome back."}
            </h1>
            <h1 className="text-2xl text-blue-100">
              {reset ? "" : "Enter your new password below."}
            </h1>
          </div>
          {reset ? (
            <button
              onClick={() => {
                navigate("/");
              }}
              className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 py-2.5 text-white w-full"
            >
              Login
            </button>
          ) : (
            <form onSubmit={newPassSubmit} className="w-full">
              <div className="flex my-1 border border-white rounded-full">
                <input
                  type={hidePw ? "password" : "text"}
                  placeholder="Password"
                  name="password"
                  value={newPass.password}
                  className="w-5/6 text-white bg-transparent border-none rounded-full focus:border-none focus:ring-0 placeholder:text-gray-400"
                  onChange={(e) => {
                    setNewPass({ ...newPass, password: e.target.value });
                    setInvalid(false);
                  }}
                />
                <div className="flex flex-col items-center justify-center w-1/5 ">
                  {hidePw ? (
                    <FiEye
                      className="text-xl text-gray-300 hover:text-white hover:cursor-pointer"
                      onClick={() => setHidePw(!hidePw)}
                    />
                  ) : (
                    <FiEyeOff
                      className="text-xl text-gray-300 hover:text-white hover:cursor-pointer"
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
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 py-2.5 text-white w-full my-6"
              >
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    );
}
