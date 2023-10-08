import React from "react";
import styles from "./GameCompleteDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import ribbon from "./../../assets/images/ribbon.png";
import CandyButton from "../buttons/candybutton/CandyButton";
import coinImage from "./../../assets/images/coin1.png";
import boltImage from "./../../assets/images/bolt-blue.png";
import hintImage from "./../../assets/images/hint.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

const GameCompleteDialogBox = ({ onPlayAgain, gameChanges }) => {
  const navigate = useNavigate();
  const { updateCurrentUser } = useAuth();
  return (
    <BaseDialogBox>
      <div className={styles.pseudoHeader}>
        <div className={styles.header}>
          <div className={styles.sunRaysBehindRibbon}></div>
          <img src={ribbon} alt="ribbon" className={styles.ribbon}></img>
          <div className={styles.title}>You win</div>
        </div>
      </div>
      <div className={styles.layout}>
        <div className={styles.heading}>STATS</div>
        <div className={styles.usedItems}>
          <div>
            Hints Used: <span>{gameChanges.hintsUsed}</span>
          </div>
          <div>
            Moves: <span>{gameChanges.moves}</span>
          </div>
          <div>
            Penalties: <span>{gameChanges.penalties}</span>
          </div>
        </div>
        <div className={styles.heading}>REWARDS</div>
        <div className={styles.tile}>
          {
            <div className={styles.tileReward}>
              <div className={styles.tileRewardText}>COINS</div>
              <img
                className={styles.rewardImage}
                src={coinImage}
                alt="coin"
              ></img>
              <div className={styles.tileRewardText}>
                {gameChanges.coinsInc}
              </div>
            </div>
          }
          {
            <div className={styles.tileReward}>
              <div className={styles.tileRewardText}>XP</div>
              <img
                className={styles.rewardImage}
                src={boltImage}
                alt="coin"
              ></img>
              <div className={styles.tileRewardText}>{gameChanges.xpInc}</div>
            </div>
          }
        </div>
        {gameChanges.isLevelUp ? (
          <div className={styles.levelUp}>
            <div className={styles.levelUpTileText}>LEVEL UP</div>
            <div className={styles.levelUpTile}>
              <div className={styles.levelUpReward}>
                <div className={styles.levelUpRewardImageContainer}>
                  <img
                    className={styles.rewardImage}
                    src={coinImage}
                    alt="coin"
                  ></img>
                </div>
                <div className={styles.levelUpRewardText}>
                  {gameChanges.bonusCoins}
                </div>
              </div>
              <div className={styles.levelUpReward}>
                <div className={styles.levelUpRewardImageContainer}>
                  <img
                    className={styles.rewardImage}
                    src={hintImage}
                    alt="hint"
                  ></img>
                </div>
                <div className={styles.levelUpRewardText}>
                  {gameChanges.bonusHints}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className={styles.buttons}>
          <CandyButton
            color="#00c486"
            colorLight="#00c486"
            colorDark="#00c486"
            onClick={onPlayAgain}
          >
            <div className={styles.buttonText}>Play Again</div>
          </CandyButton>
          <CandyButton
            color="#9c73eb"
            colorLight="#9c73eb"
            colorDark="#9c73eb"
            onClick={() => {
              updateCurrentUser();
              navigate("/");
            }}
          >
            <div className={styles.buttonText}>Home</div>
          </CandyButton>
        </div>
      </div>
    </BaseDialogBox>
  );
};

export default GameCompleteDialogBox;
