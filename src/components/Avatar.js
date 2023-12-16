import React from "react";
import styles from "../styles/Avatar.module.css";
import defaultProfileImage from "../assets/defaultprofile.jpg"; 

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={defaultProfileImage}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;