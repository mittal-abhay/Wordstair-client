import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Logo from "../../components/logo/Logo";
import coinImage from "../../assets/images/coin1.png";
import hint from "../../assets/images/hint.png";
import bolt from "../../assets/images/bolt-blue.png";
import { MdLeaderboard } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { IoStorefront } from "react-icons/io5";
import { FaShareAlt, FaTrophy } from "react-icons/fa";
import badge1 from "../../assets/images/badge1.png";
import badge2 from "../../assets/images/badge2.png";
import badge3 from "../../assets/images/badge3.png";
import badge4 from "../../assets/images/badge4.png";
import badge5 from "../../assets/images/badge5.png";
import badge6 from "../../assets/images/badge6.png";
import { useAuth } from "./../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import StoreDialogBox from "../../components/store-dialogbox/StoreDialogBox";
import { useGame } from "../../context/GameContext";
import LeaderboardDialogBox from "../../components/leaderboard-dialogbox/LeaderboardDialogBox";
import GameCompleteDialogBox from "../../components/game-complete-dialogbox/GameCompleteDialogBox";
import AchievementsDialogBox from "../../components/achievements-dialogbox/AchievementsDialogBox";
import RewardDialogBox from "../../components/reward-dialogbox/RewardDialogBox";
import HowToPlayDialogBox from "../../components/how-to-play-dialogbox/HowToPlayDialogBox";
import ReferralsDialogbox from "../../components/referrals-dialogbox/ReferralsDialogbox";
import ServerErrorDialogbox from "../../components/server-errors-dialogbox/ServerErrorDialogbox";

const Home = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { userGamesCommons } = useGame();
  const currentLevel = currentUser.level;
  const hints = currentUser.hints;
  const coins = currentUser.coins;
  const currentXP = currentUser.xp;
  const name = currentUser.name;
  const [showStore, setShowStore] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);

  const getXPBadge = () => {
    if (currentLevel <= 3) return badge1;
    else if (currentLevel <= 7) return badge2;
    else if (currentLevel <= 12) return badge3;
    else if (currentLevel <= 20) return badge4;
    else if (currentLevel <= 30) return badge5;
    else return badge6;
  };

  const getRequiredXP = () => {
    return 25 * currentLevel * (1 + currentLevel) - currentXP;
  };

  const getPercentageLevelComplete = () => {
    const previousXP = 25 * (currentLevel - 1) * currentLevel;
    const currentXP = currentUser.xp - previousXP;
    const requiredXP = 25 * currentLevel * (1 + currentLevel) - previousXP;
    return (currentXP * 100) / requiredXP;
  };

  const isLevelUnlocked = (unlockLevel) => {
    return unlockLevel <= currentLevel;
  };

  return (
    <div className={styles.layout}>
      {showReferrals && (
        <ReferralsDialogbox onClose={() => setShowReferrals(false)} />
      )}
      {showHowToPlay && (
        <HowToPlayDialogBox onClose={() => setShowHowToPlay(false)} />
      )}
      {showStore && <StoreDialogBox onClose={() => setShowStore(false)} />}
      {showAchievements && (
        <AchievementsDialogBox onClose={() => setShowAchievements(false)} />
      )}
      {showLeaderboard && (
        <LeaderboardDialogBox onClose={() => setShowLeaderboard(false)} />
      )}
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <div className={styles.xpDiv}>
            <img className={styles.xpBadge} src={getXPBadge()} alt="bolt"></img>
            <div className={styles.xpText}>{name}</div>
          </div>
          <div className={styles.progressBar}>
            <img className={styles.boltImage} src={bolt} alt="bolt"></img>
            <div
              className={styles.progressBarInner}
              style={{ width: `${getPercentageLevelComplete()}%` }}
            ></div>
          </div>
          <div className={styles.levelText}>
            {getRequiredXP()} XP to level {currentLevel + 1}
          </div>
        </div>
        <div className={styles.topRight}>
          <div className={styles.coins}>
            <img className={styles.coinImage} src={coinImage} alt="coin"></img>
            {coins}
          </div>
          <div className={styles.coins}>
            <img className={styles.coinImage} src={hint} alt="hint"></img>
            {Math.max(0, hints - userGamesCommons.hintsUsed)}
          </div>
        </div>
      </div>
      <div className={styles.logoArea}>
        <Logo />
      </div>
      <div className={styles.middle}>
        <div
          className={styles.howToPlayToggleButton}
          onClick={() => setShowHowToPlay(true)}
        >
          ?
        </div>
        <div
          className={styles.shareToggleButton}
          onClick={() => setShowReferrals(true)}
        >
          <FaShareAlt />
        </div>
        <div className={styles.levelsContainer}>
          <Link
            to="/game"
            style={{
              textDecoration: "none",
              pointerEvents: isLevelUnlocked(0) ? "" : "none",
            }}
            state={{
              difficulty: "beginner",
            }}
          >
            <div className={styles.level}>
              <div className={styles.levelLeftColorBox}>3</div>
              <div className={styles.levelRight}>
                Rookie
                {isLevelUnlocked(0) ? "" : <HiLockClosed />}
              </div>
            </div>
          </Link>
          <Link
            to="/game"
            style={{
              textDecoration: "none",
              pointerEvents: isLevelUnlocked(2) ? "" : "none",
            }}
            state={{
              difficulty: "easy",
            }}
          >
            <div className={styles.level}>
              <div className={styles.levelLeftColorBox}>4</div>
              <div className={styles.levelRight}>
                Amateur
                {isLevelUnlocked(2) ? "" : <HiLockClosed />}
              </div>
            </div>
          </Link>
          <Link
            to="/game"
            style={{
              textDecoration: "none",
              pointerEvents: isLevelUnlocked(4) ? "" : "none",
            }}
            state={{
              difficulty: "medium",
            }}
          >
            <div className={styles.level}>
              <div className={styles.levelLeftColorBox}>5</div>
              <div className={styles.levelRight}>
                Expert
                {isLevelUnlocked(4) ? "" : <HiLockClosed />}
              </div>
            </div>
          </Link>
          <Link
            to="/game"
            style={{
              textDecoration: "none",
              pointerEvents: isLevelUnlocked(8) ? "" : "none",
            }}
            state={{
              difficulty: "hard",
            }}
          >
            <div className={styles.level}>
              <div className={styles.levelLeftColorBox}>6</div>
              <div className={styles.levelRight}>
                Legend
                {isLevelUnlocked(8) ? "" : <HiLockClosed />}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <div
          className={styles.bottomOption}
          onClick={() => setShowLeaderboard(true)}
        >
          <MdLeaderboard size={36} />
        </div>
        <div
          className={styles.bottomOption}
          onClick={() => setShowAchievements(true)}
        >
          <FaTrophy size={34} />
          {currentUser.rewards.length > 0 && (
            <div className={styles.rewardsCount}>
              {currentUser.rewards.length}
            </div>
          )}
        </div>
        <div className={styles.bottomOption} onClick={() => setShowStore(true)}>
          <IoStorefront size={36} />
        </div>
      </div>
    </div>
  );
};

export default Home;
