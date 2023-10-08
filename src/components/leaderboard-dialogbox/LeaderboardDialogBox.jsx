import React, { useEffect, useState } from "react";
import styles from "./LeaderboardDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import CandyButton from "../buttons/candybutton/CandyButton";
import { ImCross } from "react-icons/im";
import badge1 from "../../assets/images/badge1.png";
import badge2 from "../../assets/images/badge2.png";
import badge3 from "../../assets/images/badge3.png";
import badge4 from "../../assets/images/badge4.png";
import badge5 from "../../assets/images/badge5.png";
import badge6 from "../../assets/images/badge6.png";
import { LoadingIcon } from "../loading/Loading";
import axios from "axios";

const LeaderboardDialogBox = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    // fetch leaderboard data
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "/user/leaderboard"
        );
        setUsers(response.data.users);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const getXPBadge = (currentLevel) => {
    if (currentLevel <= 3 || !currentLevel) return badge1;
    else if (currentLevel <= 7) return badge2;
    else if (currentLevel <= 12) return badge3;
    else if (currentLevel <= 20) return badge4;
    else if (currentLevel <= 30) return badge5;
    else return badge6;
  };

  return (
    <BaseDialogBox>
      <div className={styles.pseudoHeader}>
        <div className={styles.header}>
          <div className={styles.headerText}>Leaderboard</div>
        </div>
      </div>
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
          users &&
          users.map((user, index) => {
            return (
              <div className={styles.tile} key={index}>
                <div className={styles.rank}>{index + 1}</div>
                <img
                  className={styles.xpBadge}
                  src={getXPBadge(user.level)}
                  alt="bolt"
                ></img>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.xp}>
                  {user.xp} xp<span className={styles.level}>{user.level}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </BaseDialogBox>
  );
};

export default LeaderboardDialogBox;
