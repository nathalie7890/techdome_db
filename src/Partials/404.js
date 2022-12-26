import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles/404.styles";
import logo from "../public/images/techdome_logo.png";

export default function NotFound() {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="" className={styles.logoImg} />
        <h1 className={styles.logoCaption}>Tech Dome Penang</h1>
      </div>

      <button
        onClick={home}
        className={styles.backBtn}
      >
        Back to Earth
      </button>
    </div>
  );
}
