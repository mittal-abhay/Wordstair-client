import React, { useEffect, useState } from "react";
import styles from "./Snackbar.module.css";

const Snackbar = ({ children, duration }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, duration || 2000);
    return () => {};
  }, []);
  return (
    <div
      className={styles.snackbar}
      style={{
        visibility: show ? "visible" : "hidden",
        animationDuration: duration || 2000,
      }}
    >
      {children}
    </div>
  );
};

export default Snackbar;
