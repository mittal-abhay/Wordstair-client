import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export const LoadingIcon = () => {
  return (
    <div className={styles.loadingIconWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
