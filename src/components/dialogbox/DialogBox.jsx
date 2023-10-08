import React from "react";
import styles from "./DialogBox.module.css";

const DialogBox = ({ children }) => {
  return <div className={styles.dialogBoxWrapper}>{children}</div>;
};

export default DialogBox;
