import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { checkAuth } from "../api/users";

export default function BottomNav() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex items-center w-full h-full justify-evenly">
      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive ? "text-yellow-200" : "text-white"
        }
      >
        <BsCalendar3 className="text-2xl" />
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) =>
          isActive ? "text-yellow-200" : "text-white"
        }
      >
        <CgUserList className="text-2xl" />
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "text-yellow-200" : "text-white"
        }
      >
        <FiUser className="text-2xl" />
      </NavLink>
      <div onClick={logoutHandler}>
        <FiLogOut className="text-2xl text-white" />
      </div>
    </div>
  );
}
