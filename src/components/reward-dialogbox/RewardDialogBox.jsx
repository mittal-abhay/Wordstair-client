import React, { useState } from "react";
import styles from "./RewardDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import CandyButton from "../buttons/candybutton/CandyButton";
import { ImCross } from "react-icons/im";
import { GiChest } from "react-icons/gi";
import coinImage from "../../assets/images/coin1.png";
import bolt from "../../assets/images/bolt-blue.png";
import hints from "../../assets/images/hint.png";

import imageA from "../../assets/images/a.png";
import imageB from "../../assets/images/b.png";
import imageC from "../../assets/images/c.png";
import imageD from "../../assets/images/d.png";
import imageE from "../../assets/images/e.png";
import imageF from "../../assets/images/f.png";
import imageG from "../../assets/images/g.png";
import imageH from "../../assets/images/h.png";
import imageI from "../../assets/images/i.png";
import imageJ from "../../assets/images/j.png";
import imageK from "../../assets/images/k.png";
import imageL from "../../assets/images/l.png";
import imageM from "../../assets/images/m.png";
import imageN from "../../assets/images/n.png";
import imageO from "../../assets/images/o.png";
import imageP from "../../assets/images/p.png";
import imageQ from "../../assets/images/q.png";
import imageR from "../../assets/images/r.png";
import imageS from "../../assets/images/s.png";
import imageT from "../../assets/images/t.png";
import imageU from "../../assets/images/u.png";
import imageV from "../../assets/images/v.png";
import imageW from "../../assets/images/w.png";
import imageX from "../../assets/images/x.png";
import imageY from "../../assets/images/y.png";
import imageZ from "../../assets/images/z.png";

const RewardDialogBox = ({ onClose, reward, chestImage }) => {
  const [flipCoins, setFlipCoins] = useState(false);
  const [flipXp, setFlipXp] = useState(false);
  const [flipHints, setFlipHints] = useState(false);
  const [flipCollectible, setFlipCollectible] = useState(false);

  const getCollectibleImage = () => {
    if (reward.collectible.value === "a") return imageA;
    else if (reward.collectible.value === "b") return imageB;
    else if (reward.collectible.value === "c") return imageC;
    else if (reward.collectible.value === "d") return imageD;
    else if (reward.collectible.value === "e") return imageE;
    else if (reward.collectible.value === "f") return imageF;
    else if (reward.collectible.value === "g") return imageG;
    else if (reward.collectible.value === "h") return imageH;
    else if (reward.collectible.value === "i") return imageI;
    else if (reward.collectible.value === "j") return imageJ;
    else if (reward.collectible.value === "k") return imageK;
    else if (reward.collectible.value === "l") return imageL;
    else if (reward.collectible.value === "m") return imageM;
    else if (reward.collectible.value === "n") return imageN;
    else if (reward.collectible.value === "o") return imageO;
    else if (reward.collectible.value === "p") return imageP;
    else if (reward.collectible.value === "q") return imageQ;
    else if (reward.collectible.value === "r") return imageR;
    else if (reward.collectible.value === "s") return imageS;
    else if (reward.collectible.value === "t") return imageT;
    else if (reward.collectible.value === "u") return imageU;
    else if (reward.collectible.value === "v") return imageV;
    else if (reward.collectible.value === "w") return imageW;
    else if (reward.collectible.value === "x") return imageX;
    else if (reward.collectible.value === "y") return imageY;
    else if (reward.collectible.value === "z") return imageZ;
    return imageA;
  };

  const getFrequencyClass = () => {
    const f = reward.collectible.frequency;
    if (f === 1) return styles.epic;
    else if (f === 2) return styles.rare;
    else if (f === 3) return styles.common;
    return styles.common;
  };

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
        <div className={styles.chestContainer}>
          <img
            className={styles.rewardChestImage}
            src={chestImage}
            alt="chest"
          />
        </div>
        {<div className={styles.rewardText}>{reward.description}</div>}
        <div className={styles.cardsContainer}>
          {reward.coins > 0 && (
            <div
              className={styles.flipCardContainer}
              onClick={() => setFlipCoins(true)}
            >
              <div
                className={styles.flipCard + (flipCoins && ` ${styles.flip}`)}
              >
                <div className={styles.flipCardFront}>
                  <GiChest className={styles.cardIcon} />
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardImageContainer}>
                    <img
                      className={styles.cardImage}
                      src={coinImage}
                      alt="coin"
                    />
                  </div>
                  {reward.coins}
                </div>
              </div>
            </div>
          )}
          {reward.xp > 0 && (
            <div
              className={styles.flipCardContainer}
              onClick={() => setFlipXp(true)}
            >
              <div className={styles.flipCard + (flipXp && ` ${styles.flip}`)}>
                <div className={styles.flipCardFront}>
                  {" "}
                  <GiChest className={styles.cardIcon} />
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardImageContainer}>
                    <img className={styles.cardImage} src={bolt} alt="xp" />
                  </div>
                  {reward.xp}
                </div>
              </div>
            </div>
          )}
          {reward.hints > 0 && (
            <div
              className={styles.flipCardContainer}
              onClick={() => setFlipHints(true)}
            >
              <div
                className={styles.flipCard + (flipHints && ` ${styles.flip}`)}
              >
                <div className={styles.flipCardFront}>
                  {" "}
                  <GiChest className={styles.cardIcon} />
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardImageContainer}>
                    <img className={styles.cardImage} src={hints} alt="hints" />
                  </div>
                  {reward.hints}
                </div>
              </div>
            </div>
          )}
          {reward.collectible && (
            <div
              className={styles.flipCardContainer}
              onClick={() => setFlipCollectible(true)}
            >
              <div
                className={
                  styles.flipCard + (flipCollectible && ` ${styles.flip}`)
                }
              >
                <div className={styles.flipCardFront}>
                  {" "}
                  <GiChest className={styles.cardIcon} />
                </div>
                <div className={styles.flipCardBack}>
                  <div
                    className={
                      styles.cardImageContainerCollectible +
                      " " +
                      getFrequencyClass()
                    }
                  >
                    <img
                      className={styles.cardImageCollectible}
                      src={getCollectibleImage()}
                      alt="hints"
                    />
                  </div>
                  {reward.collectible.name}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseDialogBox>
  );
};

export default RewardDialogBox;
