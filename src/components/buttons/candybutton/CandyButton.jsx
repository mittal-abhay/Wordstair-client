import React from "react";
import styles from "./CandyButton.module.css";

const CandyButton = ({ children, onClick, color, colorLight, colorDark }) => {
  return (
    <div
      className={styles.candy}
      onClick={onClick}
      style={{
        color: color,
        borderColor: colorLight,
        background: colorLight,
        background: `-webkit-linear-gradient(top, ${colorLight}, ${colorDark})`,
        background: `-o-linear-gradient(top, ${colorLight}, ${colorDark})`,
        background: `-moz-linear-gradient(top, ${colorLight}, ${colorDark})`,
        background: `linear-gradient(to bottom, ${colorLight} 0%, ${colorDark} 100%)`,
      }}
    >
      {children}
    </div>
  );
};

export default CandyButton;
