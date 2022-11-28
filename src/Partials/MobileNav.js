import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../public/images/techdome_logo.png";

export default function MobileNav() {
  const navItemRef = useRef(null);
  const navRef = useRef(null);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const onClickHandler = (e) => {
    e.currentTarget.firstElementChild.classList.toggle("hidden");
    e.currentTarget.firstElementChild.nextElementSibling.classList.toggle(
      "hidden"
    );
    navRef.current.classList.toggle("h-screen");
    navItemRef.current.classList.toggle("hidden");
    navItemRef.current.classList.toggle("flex");
  };

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-10 flex flex-col w-screen px-6 py-4 bg-white shadow-md overflow-y-clip shadow-zinc-300 md:hidden"
    >
      <div className="flex justify-between">
        <div className="flex items-end space-x-2">
          <img src={logo} alt="" className="w-8 h-8" />
          <h1 className="text-lg text-blue-500 uppercase">Tech Dome Penang</h1>
        </div>
        <button onClick={onClickHandler}>
          <AiOutlineMenu className="text-3xl text-zinc-600" />
          <AiOutlineClose className="hidden text-3xl text-zinc-600" />
        </button>
      </div>
      <div
        ref={navItemRef}
        className="flex-col items-center justify-center hidden h-full space-y-10 text-2xl uppercase text-zinc-700 "
      >
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "hover:text-blue-500"
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "hover:text-blue-500"
          }
        >
          Contacts
        </NavLink>{" "}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "hover:text-blue-500"
          }
        >
          Profile
        </NavLink>
        <p onClick={logoutHandler}>Logout</p>
      </div>
    </div>
  );
}
