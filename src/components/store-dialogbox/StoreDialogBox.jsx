import React, { useEffect, useState } from "react";
import styles from "./StoreDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import treasureChest from "./../../assets/images/treasure-chest.png";
import CandyButton from "../buttons/candybutton/CandyButton";
import coinImage from "./../../assets/images/coin1.png";
import hint from "./../../assets/images/hint.png";
import hint2 from "./../../assets/images/hint2.png";
import hint3 from "./../../assets/images/hint3.png";
import hint4 from "./../../assets/images/hint4.png";
import { ImCross } from "react-icons/im";
import { useAuth } from "../../context/AuthContext";
import { useGame } from "../../context/GameContext";
import { LoadingIcon } from "../loading/Loading";

const StoreDialogBox = ({ onClose }) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { userGamesCommons, makeTransaction, getStoreItems } = useGame();
  const [storeItems, setStoreItems] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStoreItems = async () => {
    setLoading(true);
    const items = await getStoreItems();
    setStoreItems(items.storeItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchStoreItems();
    return () => {};
  }, []);

  const doTransaction = async (item) => {
    if (loading) return;
    if (item.type === "ad") {
      setMessage("No ads available");
      return;
    }
    setLoading(true);
    if (currentUser.coins >= item.cost.coins) {
      await makeTransaction(item.id);
      updateCurrentUser();
      setMessage("Transaction successful");
    } else {
      setMessage("Not enough coins");
    }
    setLoading(false);
  };

  const getImage = (item) => {
    if (item.type === "ad") return coinImage;
    else if (item.type === "hint") {
      if (item.quantity.hints <= 10) return hint;
      else if (item.quantity.hints <= 50) return hint2;
      else if (item.quantity.hints <= 100) return hint3;
      else if (item.quantity.hints <= 200) return hint4;
    }
    return coinImage;
  };

  return (
    <BaseDialogBox>
      <div className={styles.pseudoTreasureChestPositionElement}>
        <img
          src={treasureChest}
          alt="store"
          className={styles.treasureChest}
        ></img>
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
        <div className={styles.coinsHintsContainer}>
          <div className={styles.coins}>
            <img className={styles.coinImage} src={coinImage} alt="coin"></img>
            {currentUser.coins}
          </div>
          <div className={styles.coins}>
            <img className={styles.coinImage} src={hint} alt="hint"></img>
            {currentUser.hints - userGamesCommons.hintsUsed}
          </div>
        </div>
        {message != "" && <div className={styles.message}>{message}</div>}
        {loading ? (
          <LoadingIcon />
        ) : (
          storeItems &&
          storeItems.map((item, index) => {
            return (
              <div className={styles.tile} key={index}>
                <img
                  src={getImage(item)}
                  alt={item.name}
                  className={styles.tileImage}
                ></img>
                {item.originalCost.coins > item.cost.coins && (
                  <span className={styles.dicountText}>
                    +
                    {Math.round(
                      ((item.originalCost.coins - item.cost.coins) * 100) /
                        item.cost.coins
                    )}
                    %
                  </span>
                )}
                <span className={styles.tileQuantity}>
                  x
                  {item.quantity.hints > 0
                    ? item.quantity.hints
                    : item.quantity.coins}
                </span>
                <div className={styles.tileEnd}>
                  {item.originalCost.coins > item.cost.coins && (
                    <div className={styles.tileCost}>
                      {item.originalCost.coins}
                    </div>
                  )}
                  <CandyButton
                    color="white"
                    colorLight={item.color}
                    colorDark={item.color}
                    onClick={() => doTransaction(item)}
                  >
                    <div className={styles.tileButton}>
                      {item.cost.coins !== 0
                        ? `${item.cost.coins} coins`
                        : item.name}
                    </div>
                  </CandyButton>
                </div>
              </div>
            );
          })
        )}
      </div>
    </BaseDialogBox>
  );
};

export default StoreDialogBox;
