import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-no-repeat bg-cover bg-notFound">
      <button
        onClick={home}
        className="fixed px-8 py-4 text-lg font-semibold text-white bg-[#06b6d4] rounded-full bottom-36 hover:bg-[#0891b2]"
      >
        Back to Earth
      </button>
    </div>
  );
}
