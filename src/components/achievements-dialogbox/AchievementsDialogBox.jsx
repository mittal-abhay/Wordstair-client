import React, { useEffect, useState } from "react";
import styles from "./AchievementsDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import CandyButton from "../buttons/candybutton/CandyButton";
import { ImCross } from "react-icons/im";
import chest from "../../assets/images/chest.png";
import chest1 from "../../assets/images/chest1.png";
import chest2 from "../../assets/images/chest2.png";
import chest3 from "../../assets/images/chest3.png";
import chest4 from "../../assets/images/chest4.png";
import chest5 from "../../assets/images/chest5.png";
import { useGame } from "../../context/GameContext";
import { useAuth } from "../../context/AuthContext";
import { LoadingIcon } from "../loading/Loading";
import RewardDialogBox from "../reward-dialogbox/RewardDialogBox";

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

const AchievementsDialogBox = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const { currentUser, updateCurrentUser } = useAuth();
  const [achievements, setAchievements] = useState(null);
  const { getAchievements, openReward } = useGame();
  const [showReward, setShowReward] = useState(false);
  const [reward, setReward] = useState(null);

  const getImage = (chestImageName) => {
    if (chestImageName === "chest1") return chest1;
    else if (chestImageName === "chest2") return chest2;
    else if (chestImageName === "chest3") return chest3;
    else if (chestImageName === "chest4") return chest4;
    else if (chestImageName === "chest5") return chest5;
    return chest;
  };

  const fetchAchievements = async () => {
    setLoading(true);
    let data = await getAchievements();
    for (let i = 0; i < data.achievements.length; i++) {
      data.achievements[i] = {
        ...getAchievementProps(data.achievements[i]),
      };
    }
    setAchievements(data.achievements);
    setLoading(false);
  };

  const getAchievementProps = (achievement) => {
    let progress = "";
    let percentageComplete = 0;
    let condition = achievement.condition;
    let isCompleted = false;
    if (achievement.type === "games-played") {
      if (currentUser.gamesPlayed >= condition) {
        isCompleted = true;
        progress = `${condition}/${condition}`;
        percentageComplete = 100;
      } else {
        progress = `${currentUser.gamesPlayed}/${condition}`;
        percentageComplete = (currentUser.gamesPlayed / condition) * 100;
      }
    } else if (achievement.type === "purchases-from-coins") {
      if (currentUser.purchasesCoinsAmount >= condition) {
        isCompleted = true;
        progress = `${condition}/${condition}}`;
        percentageComplete = 100;
      } else {
        progress = `${currentUser.purchasesCoinsAmount}/${condition}`;
        percentageComplete =
          (currentUser.purchasesCoinsAmount / condition) * 100;
      }
    } else if (achievement.type === "hints-used") {
      if (currentUser.totalHintsUsed >= condition) {
        isCompleted = true;
        progress = `${condition}/${condition}}`;
        percentageComplete = 100;
      } else {
        progress = `${currentUser.totalHintsUsed}/${condition}`;
        percentageComplete = (currentUser.totalHintsUsed / condition) * 100;
      }
    }
    return {
      name: achievement.name,
      description: achievement.description,
      chestImage: getImage(achievement.rewards.chestImage),
      progress: progress,
      isCompleted: isCompleted,
      percentageComplete: percentageComplete,
    };
  };

  const openRewardHandler = (reward) => {
    setReward(reward);
    setShowReward(true);
    openReward(reward.id).then(() => {
      updateCurrentUser();
    });
  };

  const getCollectibleImage = (value) => {
    if (value === "a") return imageA;
    else if (value === "b") return imageB;
    else if (value === "c") return imageC;
    else if (value === "d") return imageD;
    else if (value === "e") return imageE;
    else if (value === "f") return imageF;
    else if (value === "g") return imageG;
    else if (value === "h") return imageH;
    else if (value === "i") return imageI;
    else if (value === "j") return imageJ;
    else if (value === "k") return imageK;
    else if (value === "l") return imageL;
    else if (value === "m") return imageM;
    else if (value === "n") return imageN;
    else if (value === "o") return imageO;
    else if (value === "p") return imageP;
    else if (value === "q") return imageQ;
    else if (value === "r") return imageR;
    else if (value === "s") return imageS;
    else if (value === "t") return imageT;
    else if (value === "u") return imageU;
    else if (value === "v") return imageV;
    else if (value === "w") return imageW;
    else if (value === "x") return imageX;
    else if (value === "y") return imageY;
    else if (value === "z") return imageZ;
    return imageA;
  };

  const getFrequencyClass = (frequency) => {
    if (frequency === 1) return styles.epic;
    else if (frequency === 2) return styles.rare;
    else if (frequency === 3) return styles.common;
    return styles.common;
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <BaseDialogBox>
      {showReward && (
        <RewardDialogBox
          onClose={() => setShowReward(false)}
          reward={reward.rewards}
          chestImage={getImage(reward.rewards.chestImage)}
        />
      )}
      <div className={styles.pseudoHeader}>
        <div className={styles.header}>
          <div className={styles.headerText}>Achievements</div>
        </div>
      </div>
      <div className={styles.rewardsScrollingContainer}>
        {currentUser.rewards.length > 0 ? (
          currentUser.rewards.map((reward, index) => {
            return (
              <div
                className={styles.rewardSquare}
                onClick={() => openRewardHandler(reward)}
                key={index}
              >
                <img
                  className={styles.rewardImage}
                  src={getImage(reward.rewards.chestImage)}
                  alt="rewards"
                />
              </div>
            );
          })
        ) : (
          <div className={styles.noRewardsText}>You have no rewards left!</div>
        )}
      </div>
      {currentUser.collectibles.length > 0 && (
        <div className={styles.rewardsScrollingContainer}>
          {currentUser.collectibles.map((collectible, index) => {
            return (
              <div
                className={
                  styles.rewardSquareCollectible +
                  " " +
                  getFrequencyClass(collectible.frequency)
                }
                key={index}
              >
                <img
                  className={styles.rewardImageCollectible}
                  src={getCollectibleImage(collectible.value)}
                  alt="collectible"
                />
              </div>
            );
          })}
        </div>
      )}
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

        {loading ? (
          <LoadingIcon />
        ) : (
          achievements &&
          achievements.map((achievement, index) => {
            return (
              <div className={styles.tile} key={index}>
                <div className={styles.tileLeft}>
                  <div className={styles.tileTitle}>{achievement.name}</div>
                  <div className={styles.tileDescription}>
                    {achievement.description}
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressBarInner}
                      style={{ width: `${achievement.percentageComplete}%` }}
                    >
                      <div className={styles.progressBarInnerLabel}>
                        {achievement.progress}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.tileRight}>
                  <div className={styles.rewardImageContainer}>
                    <img
                      className={
                        achievement.isCompleted
                          ? styles.rewardImage
                          : styles.rewardImageUsed
                      }
                      src={achievement.chestImage}
                      alt="rewards"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </BaseDialogBox>
  );
};

export default AchievementsDialogBox;
