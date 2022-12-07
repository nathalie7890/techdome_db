import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./public/images/techdome_logo.png";

export default function NotFound() {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-center bg-no-repeat bg-cover bg-notFound">
      <div className="absolute flex items-end space-x-2 top-5 left-10 ">
        <img src={logo} alt="" className="w-8 h-8 animate-pulse" />
        <h1 className="text-lg text-blue-200 uppercase">Tech Dome Penang</h1>
      </div>

      <button
        onClick={home}
        className="fixed px-8 py-4 text-lg font-semibold text-white bg-[#06b6d4] rounded-full bottom-36 hover:bg-[#0891b2]"
      >
        Back to Earth
      </button>
    </div>
  );
}
