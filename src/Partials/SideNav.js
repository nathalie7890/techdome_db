import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { checkAuth } from "../api/users";
import logo from "../public/images/techdome_logo.png";

export default function SideNav({ editOpen }) {
  const { user, isAdmin } = checkAuth();

  const initials = (name) => {
    name = name.split(" ");
    if (name.length < 2) return name[0].slice(0, 2);
    return name[0][0] + name[1][0];
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const inactiveStyle = `flex px-2 py-4 space-x-4 rounded-md text-white hover:bg-white/10 ${
    !editOpen.visible ? "justify-start " : "justify-center"
  }`;

  const activeStyle = `bg-white/20 flex px-2 py-4 space-x-4 rounded-md text-white hover:bg-white/10 ${
    !editOpen.visible ? "justify-start " : "justify-center"
  } `;

  return (
    <div
      className={`w-full ${
        !editOpen.visible ? "p-4" : "p-2"
      } sticky top-0 left-0`}
    >
      {!editOpen.visible && isAdmin ? (
        <h1 className="flex justify-end w-full text-sm font-bold text-blue-200">
          Admin
        </h1>
      ) : null}
      <div>
        <div className="flex my-16">
          <div
            className={`flex flex-col items-center justify-center bg-blue-900 rounded-md ${
              !editOpen.visible ? "w-12 h-12" : "w-full h-12"
            }`}
          >
            <h1 className="text-2xl font-semibold text-white uppercase">
              {initials(user?.data.name)}
            </h1>
          </div>
          {!editOpen.visible ? (
            <div className="flex flex-col justify-end px-2 text-sm text-gray-100">
              <h1 className="font-semibold text-white">{user?.data.name}</h1>
              <p>{user?.data.email}</p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col space-y-4">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <BsCalendar3 className="text-2xl text-white" />
            {!editOpen.visible ? (
              <h1 className="flex flex-col justify-end">Events</h1>
            ) : null}
          </NavLink>
          {isAdmin ? (
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              <CgUserList className={`text-2xl text-white`} />
              {!editOpen.visible ? (
                <h1 className="flex flex-col justify-end">Contacts</h1>
              ) : null}
            </NavLink>
          ) : null}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <FiUser className="text-2xl text-white" />
            {!editOpen.visible ? (
              <h1 className="flex flex-col justify-end">Profile</h1>
            ) : null}
          </NavLink>
          <div
            onClick={logoutHandler}
            className={`flex px-2 py-4 space-x-4 rounded-md text-white hover:bg-white/10 cursor-pointer ${
              !editOpen.visible ? "justify-start" : "justify-center"
            }`}
          >
            <FiLogOut className="text-2xl text-white" />
            {!editOpen.visible ? (
              <h1 className="flex flex-col justify-end">Logout</h1>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
