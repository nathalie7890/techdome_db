import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { checkAuth } from "../api/users";
import { styles } from "./styles/SideNav.styles";

export default function SideNav({ editOpen }) {
  const { user, isAdmin } = checkAuth();

  // generate user's initials
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

  //class names for navlinks
  const activeStyle = `${styles.navlinkActive} ${
    !editOpen.visible ? "justify-start " : "justify-center"
  } `;

  const inactiveStyle = `${styles.navlinkInactive} ${
    !editOpen.visible ? "justify-start " : "justify-center"
  }`;

  return (
    <div
      className={`w-full ${
        !editOpen.visible ? "p-4" : "p-2"
      } sticky top-0 left-0`}
    >
      {!editOpen.visible && isAdmin ? (
        <h1 className={styles.adminTitle}>Admin</h1>
      ) : null}
      <div>
        {/* user's initials, name and email */}
        <div className="flex my-16">
          <div
            className={` ${!editOpen.visible ? "w-12 h-12" : "w-full h-12"} ${
              styles.userContainer
            }`}
          >
            <h1 className={styles.initials}>{initials(user?.data.name)}</h1>
          </div>
          {!editOpen.visible ? (
            <div className={styles.nameEmailContainer}>
              <h1 className="font-semibold text-white">{user?.data.name}</h1>
              <p>{user?.data.email}</p>
            </div>
          ) : null}
        </div>
        {/*end of user's initials, name and email */}

        {/* navlinks */}
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
          {/* logout button */}
          <div
            onClick={logoutHandler}
            className={` ${
              !editOpen.visible ? "justify-start" : "justify-center"
            } ${styles.logoutBtnContainer}`}
          >
            <FiLogOut className="text-2xl text-white" />
            {!editOpen.visible ? (
              <h1 className="flex flex-col justify-end">Logout</h1>
            ) : null}
          </div>
          {/* end of logout button */}
        </div>
        {/* end of navlinks */}
      </div>
    </div>
  );
}
