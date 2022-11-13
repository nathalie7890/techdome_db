import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginFn } from "../api/users";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import logo from "../public/images/techdome_logo.png";

export default function Login2() {
  const [hidePw, setHidePw] = useState(true);
  const [loginFail, setLoginFail] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const res = await loginFn(user);
    if (res.status === 400 || res.status === 228) {
      setLoginFail(true);
      return;
    }
    navigate("/events");
  };

  const loginOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setLoginFail(false);
  };

  return (
    <div className="relative w-full h-screen bg-no-repeat bg-cover bg-landing">
      <div className="absolute flex items-end space-x-2 top-5 left-10 ">
        <img src={logo} alt="" className="w-8 h-8 animate-pulse" />
        <h1 className="text-lg text-blue-200 uppercase">Tech Dome Penang</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-screen">
        <div className="w-2/3 px-12 py-16 shadow-xl rounded-xl h-fit bg-black/40 shadow-black/50">
          <div className="mb-16 space-y-4">
            <h1 className="text-6xl font-bold text-blue-200">Dashboard</h1>
            <h1 className="p-1 mb-10 text-2xl text-blue-100">
              <span className="text-3xl font-bold text-yellow-200">Hello</span>,
              login to your account.
            </h1>
          </div>
          <form
            onSubmit={loginSubmit}
            className="flex flex-col space-y-6 text-white"
          >
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={loginOnChange}
              className="bg-transparent border-white rounded-full placeholder:text-white focus:border-yellow-200 focus:ring-yellow-200"
              placeholder="Email"
            />
            <div className="flex bg-transparent border border-white rounded-full">
              <input
                type={hidePw ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={loginOnChange}
                className="w-10/12 bg-transparent border-0 rounded-full placeholder:text-white focus:ring-0 focus:border-none"
              />
              <div className="flex flex-col items-center justify-center w-2/12">
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
            {loginFail ? (
              <div className="flex items-center space-x-1 text-red-300 rounded-full">
                <AiOutlineExclamationCircle className="inline" />
                <h1>Did you enter the correct username and password?</h1>
              </div>
            ) : null}
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 py-2.5 text-white"
            >
              Login
            </button>
          </form>
          <div className="my-6">
            <Link to="/reset" className="text-yellow-300 text-start">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
