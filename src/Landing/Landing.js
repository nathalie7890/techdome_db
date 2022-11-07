import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../public/images/techdome_logo.png";

export default function Landing() {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/");
  };
  return (
    <div className="relative w-full h-screen bg-no-repeat bg-cover bg-landing2">
      <div className="absolute flex items-end space-x-2 top-10 left-10 ">
        <img src={logo} alt="" className="w-8 h-8 animate-pulse" />
        <h1 className="text-lg text-blue-200 uppercase">Tech Dome Penang</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-screen">
        <div className="w-1/2">
          <div className="mb-16 space-y-4">
            <h1 className="text-6xl font-bold text-blue-200">Dashboard</h1>
            <h1 className="p-1 mb-10 text-2xl font-semibold text-blue-100">
              <span className="text-3xl font-bold text-yellow-200">Hello</span>, login to your account.
            </h1>
          </div>
          <form className="flex flex-col space-y-6 text-white">
            <input
              type="text"
              className="bg-transparent border-white rounded-full placeholder:text-white focus:border-yellow-200 focus:ring-yellow-200" 
              placeholder="Email"
            />
            <input
              type="text"
              className="bg-transparent border-white rounded-full placeholder:text-white focus:border-yellow-200 focus:ring-yellow-200"
              placeholder="Password"
            />
            <button
              className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 py-2.5 text-white "
              onClick={loginHandler}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
