import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login as loginFn } from "../api/users";

export default function Login() {
  const [hidePw, setHidePw] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    await loginFn(user);
    navigate("/events");
  };

  const loginOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-end w-full h-screen bg-center bg-cover bg-homepage">
      <div className="flex flex-col items-center justify-center w-1/2 px-48 w-100">
        <div className="flex flex-col items-center justify-center w-full space-y-8">
          <form className="w-full space-y-8" onSubmit={loginSubmit}>
            <h1 className="text-2xl text-left text-white uppercase">login</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              className="w-full text-white bg-transparent border-0 border-b border-white placeholder:text-gray-300 focus:ring-0 focus:border-b-white"
              onChange={loginOnChange}
            />
            <div className="flex w-full border-0 border-b border-white">
              <input
                type={hidePw ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={user.password}
                className="w-4/5 text-white bg-transparent border-none rounded-full focus:border-none focus:ring-0 placeholder:text-gray-300"
                onChange={loginOnChange}
              />
              <div className="flex flex-col items-center justify-center w-1/5">
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
            <button
              className="w-full py-2.5 rounded-full bg-transparent border-white border text-white"
              type="submit"
            >
              Login
            </button>
          </form>
          <Link to="/register" className="my-6 text-gray-400 text-start">
            Don't have an account? Click here to{" "}
            <span className="text-yellow-300">Register.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
