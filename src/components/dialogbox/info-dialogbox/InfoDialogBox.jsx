import React from "react";
import styles from "./InfoDialogBox.module.css";
import CandyButton from "../../buttons/candybutton/CandyButton";
import BaseDialogBox from "../base-dialogbox/BaseDialogBox";

const InfoDialogBox = ({ info, onAccept }) => {
  return (
      <BaseDialogBox>
        <div className={styles.info}>{info}</div>
        <CandyButton
          onClick={onAccept}
          color="white"
          colorLight="#00c486"
          colorDark="#00c486"
        >
          <div style={{ margin: "0 1.25rem" }}>OK</div>
        </CandyButton>
      </BaseDialogBox>
  );
};

export default InfoDialogBox;
