import React from "react";
import styles from "./BaseDialogBox.module.css";
import DialogBox from "../DialogBox";

const BaseDialogBox = ({ children }) => {
  return (
    <DialogBox>
      <div className={styles.baseDialogBoxWrapper}>
        <div className={styles.baseDialogBoxWrapperInner}>
          <div className={styles.baseDialogBox}>{children}</div>
        </div>
      </div>
    </DialogBox>
  );
};

export default BaseDialogBox;
