import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../public/images/techdome_logo.png";
import { styles } from "./styles/MobileNav.styles";

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
    <div ref={navRef} className={styles.mainContainer}>
      <div className="flex justify-between">
        {/* Tech Dome logo */}
        <div className={styles.logoContainer}>
          <img src={logo} alt="" className={styles.logoImg} />
          <h1 className={styles.logoCaption}>Tech Dome Penang</h1>
        </div>
        {/* end of Tech Dome logo */}

        <button onClick={onClickHandler}>
          <AiOutlineMenu className="text-3xl text-zinc-600" />
          <AiOutlineClose className="hidden text-3xl text-zinc-600" />
        </button>
      </div>

      {/* navlinks */}
      <div ref={navItemRef} className={styles.navContainer}>
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
      {/* end of navlinks */}
    </div>
  );
}
