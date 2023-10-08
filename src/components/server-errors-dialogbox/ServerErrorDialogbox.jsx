import React from "react";
import styles from "./ServerErrorDialogbox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";

const ServerErrorDialogbox = ({ message, details }) => {
  return (
    <BaseDialogBox>
      <div className={styles.layout}>
        <div className={styles.title}>Server Error</div>
        <div className={styles.content}>
          <div className={styles.message}>{message}</div>
          <div className={styles.details}>{details}</div>
        </div>
      </div>
    </BaseDialogBox>
  );
};

export default ServerErrorDialogbox;
