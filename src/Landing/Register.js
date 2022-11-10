import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "../api/users";
import { login as loginFn } from "../api/users";

export default function Register() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [hidePw, setHidePw] = useState(true);
  const registerOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const registerSubmit = async (e) => {
    e.preventDefault();
    await register(user);
    await loginFn({ email: user.email, password: user.password });
    navigate("/events");
  };
  return (
    <div className="flex justify-end w-full h-screen bg-cover bg-homepage">
      <div className="flex flex-col items-center justify-center w-1/2 h-full px-48">
        <div className="flex flex-col items-center justify-center w-full space-y-8">
          <form className="w-full space-y-8" onSubmit={registerSubmit}>
            <h1 className="text-2xl text-left text-white uppercase">Sign Up</h1>
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={user.firstname}
                className="w-full text-white bg-transparent border-0 border-b border-white placeholder:text-gray-300 focus:ring-0 focus:border-b-white"
                onChange={registerOnChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={user.lastname}
                className="w-full text-white bg-transparent border-0 border-b border-white placeholder:text-gray-300 focus:ring-0 focus:border-b-white"
                onChange={registerOnChange}
              />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              className="w-full text-white bg-transparent border-0 border-b border-white placeholder:text-gray-300 focus:ring-0 focus:border-b-white"
              onChange={registerOnChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              className="w-full text-white bg-transparent border-0 border-b border-white placeholder:text-gray-300 focus:ring-0 focus:border-b-white"
              onChange={registerOnChange}
            />
            <div className="flex w-full border-0 border-b border-white">
              <input
                type={!hidePw ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={user.password}
                className="w-4/5 text-white bg-transparent border-none rounded-full focus:border-none focus:ring-0 placeholder:text-gray-300"
                onChange={registerOnChange}
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
              Sign Up
            </button>
          </form>
          <Link to="/" className="text-gray-400 text-start">
            Already have an account? Click here to{" "}
            <span className="text-yellow-200">Login.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
