import React from "react";
import styles from "./ReferralsDialogbox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import CandyButton from "../buttons/candybutton/CandyButton";
import { ImCross } from "react-icons/im";
import { useAuth } from "../../context/AuthContext";

const ReferralsDialogbox = ({ onClose }) => {
  const { currentUser } = useAuth();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Alphastair",
          text: "Alphastair is a fun and interactive word game. Play now!\n\nYou will get reward on signing up with my referral link.\n\n",
          url: "https://alphastair.netlify.app/signup?ref=" + currentUser._id,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported");
      navigator.clipboard.writeText(
        "Alphastair is a fun and interactive word game. Play now!\n\nYou will get reward on signing up with my referral link.\n\nhttps://alphastair.netlify.app/signup?ref=" +
          currentUser._id
      );
    }
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
        <div className={styles.title}>Referrals</div>
        <div className={styles.shareLinkTile}>
          <div className={styles.shareLinkTileTitle}>Share Link</div>
          <div className={styles.shareLinkTileDesc}>
            Share this link with your friends to{" "}
            <span style={{ color: "blue" }}>earn rewards</span>
          </div>
          <div className={styles.shareLinkTileLink} onClick={handleShare}>
            Share Referral Link
          </div>
        </div>
        <div className={styles.referrals}>
          {currentUser.referrals.map((referral, index) => {
            return (
              <div className={styles.referral}>
                <div className={styles.index}>{index + 1}</div>
                <div>
                  <div className={styles.referralName}>{referral.name}</div>
                  <div className={styles.referralTime}>
                    {Intl.DateTimeFormat("en-IN", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: false,
                    }).format(referral.time)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BaseDialogBox>
  );
};

export default ReferralsDialogbox;
