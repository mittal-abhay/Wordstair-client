import React from "react";
import styles from "./HowToPlayDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import CandyButton from "../buttons/candybutton/CandyButton";
import { ImCross } from "react-icons/im";

const HowToPlayDialogBox = ({ onClose }) => {
  return (
    <BaseDialogBox>
      <div className={styles.layout}>
        <div className={styles.closeButton}>
          <CandyButton
            color="white"
            colorLight="#e0811b"
            colorDark="#e0811b"
            onClick={onClose}
          >
            <ImCross style={{ margin: "0.5rem" }} />
          </CandyButton>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>How to play?</div>
          <div className={styles.description}>
            <div className={styles.descriptionText}>
              <div className={styles.descriptionTextTitle}>Objective</div>
              <div className={styles.descriptionTextContent}>
                The objective of the game is to reach the TARGET word from the
                given word under the following rules:
                <br /> 1. You can <span>only change one letter</span> at a time.
                <br /> 2. You can only change a letter if the{" "}
                <span>new word makes an actual word.</span>
              </div>
              <div className={styles.descriptionTextTitle}>Scoring</div>
              <div className={styles.descriptionTextContent}>
                You will be awarded points based on the number of letters in the
                word you have reached. For example, if you reach the word "cat"
                from the word "dog", you will be awarded points for 3 letters.
                The game has multiple levels, and the number of points you will
                be awarded will increase as you progress through the levels.
                <br />
                <br />
                You will also be awarded points for the number of moves you make
                to reach the TARGET word. The fewer the moves, the more points
                you will be awarded.
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseDialogBox>
  );
};

export default HowToPlayDialogBox;
