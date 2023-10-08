import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import cc3 from "./../assets/data/cc3.js";
import cc4 from "./../assets/data/cc4.js";
import cc5 from "./../assets/data/cc5.js";
import cc6 from "./../assets/data/cc6.js";
import { useAuth } from "./AuthContext";

const GameContext = React.createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const GameProvider = ({ children }) => {
  const [userGamesCommons, setUserGamesCommons] = useState(null);
  const { currentUser, updateCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  async function getPair(difficulty) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/game/pair",
        {
          params: {
            difficulty: difficulty,
          },
        }
      );
      return response.data;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function getHint(difficulty, start, end) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/game/hint",
        {
          params: {
            difficulty: difficulty,
            start: start,
            end: end,
          },
        }
      );
      return response.data;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  function doesPathExists(difficulty, word, end) {
    let cc = cc3;
    if (difficulty === "easy") {
      cc = cc4;
    } else if (difficulty === "medium") {
      cc = cc5;
    } else if (difficulty === "hard") {
      cc = cc6;
    }
    for (let x of cc) {
      if (x.includes(word) && x.includes(end)) {
        return true;
      }
    }
    return false;
  }

  async function updateUserGames() {
    const tempUserGame3 = JSON.parse(
      localStorage.getItem("userGamebeginner") ?? "null"
    );
    const tempUserGame4 = JSON.parse(
      localStorage.getItem("userGameeasy") ?? "null"
    );
    const tempUserGame5 = JSON.parse(
      localStorage.getItem("userGamemedium") ?? "null"
    );
    const tempUserGame6 = JSON.parse(
      localStorage.getItem("userGamehard") ?? "null"
    );
    setUserGamesCommons({
      hintsUsed:
        (tempUserGame3 ? tempUserGame3.hintsUsed : 0) +
        (tempUserGame4 ? tempUserGame4.hintsUsed : 0) +
        (tempUserGame5 ? tempUserGame5.hintsUsed : 0) +
        (tempUserGame6 ? tempUserGame6.hintsUsed : 0),
    });
    setLoading(false);
  }

  async function submitUserGame(start, end, moves, penalties, hintsUsed) {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_BASE_URL + "/game/update",
        {
          start: start,
          end: end,
          moves: moves,
          penalties: penalties,
          hintsUsed: hintsUsed,
        }
      );
      return response.data;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function makeTransaction(itemID) {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_BASE_URL + "/user/transaction",
        {
          itemID: itemID,
        }
      );
      return response.data;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function getStoreItems() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/game/store"
      );
      return response.data;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function getAchievements() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/user/achievements"
      );
      return response.data;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  async function openReward(rewardID) {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_API_BASE_URL + "/user/openreward",
        {
          rewardID: rewardID,
        }
      );
      return response.data;
    } catch (error) {
      // handle error
      console.log(error);
    }
  }

  useEffect(() => {
    updateUserGames();
  }, []);

  const value = {
    getPair,
    getHint,
    doesPathExists,
    updateUserGames,
    userGamesCommons,
    submitUserGame,
    makeTransaction,
    getStoreItems,
    getAchievements,
    openReward,
  };
  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
};

export default GameProvider;
