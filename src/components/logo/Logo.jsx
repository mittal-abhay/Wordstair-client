import React from "react";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.letter}>A</div>
      <div className={styles.letter}>L</div>
      <div className={styles.letter}>P</div>
      <div className={styles.letter}>H</div>
      <div className={styles.letter}>A</div>
      <div className={styles.letter}>S</div>
      <div className={styles.letter}>T</div>
      <div className={styles.letter}>A</div>
      <div className={styles.letter}>I</div>
      <div className={styles.letter}>R</div>
    </div>
  );
};

export default Logo;
