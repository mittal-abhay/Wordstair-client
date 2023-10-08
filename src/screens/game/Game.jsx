import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";
import homeStyles from "./../home/Home.module.css";
import coinImage from "../../assets/images/coin1.png";
import hintImage from "../../assets/images/hint.png";
import bolt from "../../assets/images/bolt-blue.png";
import badge1 from "../../assets/images/badge1.png";
import badge2 from "../../assets/images/badge2.png";
import badge3 from "../../assets/images/badge3.png";
import badge4 from "../../assets/images/badge4.png";
import badge5 from "../../assets/images/badge5.png";
import badge6 from "../../assets/images/badge6.png";
import { useAuth } from "./../../context/AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InfoDialogBox from "../../components/dialogbox/info-dialogbox/InfoDialogBox";
import { useGame } from "../../context/GameContext";
import GameCompleteDialogBox from "../../components/game-complete-dialogbox/GameCompleteDialogBox";
import Loading from "../../components/loading/Loading";

const Game = () => {
  const location = useLocation();
  const difficulty = location.state.difficulty;
  const [startWord, setStartWord] = useState("");
  const [endWord, setEndWord] = useState("");
  const [previousWord, setPreviousWord] = useState(startWord);
  const [inputWord, setInputWord] = useState(startWord);
  const [changedIndexes, setChangedIndexes] = useState([]);
  const [active, setActive] = useState(-1);
  const [hint, setHint] = useState("");
  const [hintError, setHintError] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [penalties, setPenalties] = useState(0);
  const [showOldGameMessage, setShowOldGameMessage] = useState(false);
  const [showCompletedGameMessage, setShowCompletedGameMessage] =
    useState(false);
  const [completedGameResult, setCompletedGameResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, updateCurrentUser } = useAuth();
  const {
    getPair,
    getHint,
    doesPathExists,
    updateUserGames,
    userGamesCommons,
    submitUserGame,
  } = useGame();
  const [moves, setMoves] = useState(0);
  const currentLevel = currentUser.level;
  const hints = currentUser.hints;
  const coins = currentUser.coins;
  const currentXP = currentUser.xp;
  const name = currentUser.name;

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

  const getWordsPair = async () => {
    setLoading(true);
    setMoves(0);
    try {
      const pair = await getPair(difficulty);
      setPreviousWord(pair.start);
      setStartWord(pair.start);
      setInputWord(pair.start);
      setEndWord(pair.end);
    } catch (error) {
      // handle error
      console.log(error);
    }
    setLoading(false);
  };

  const computeChangedIndexes = (word1, word2) => {
    let changedIndexes = [];
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        changedIndexes.push(i);
      }
    }
    return changedIndexes;
  };

  const changeLetter = (letter) => {
    if (active === -1) return;
    if (changedIndexes.length > 0 && !changedIndexes.includes(active)) {
      // cannot select more than 1 letter
      setActive(-1);
      return;
    }
    let newWord = inputWord.split("");
    newWord[active] = letter;
    setInputWord(newWord.join(""));
    setChangedIndexes(computeChangedIndexes(previousWord, newWord.join("")));
  };

  const removeLetter = () => {
    if (active === -1) return;
    setInputWord(previousWord);
    setChangedIndexes([]);
    setActive(-1);
    setHintError("");
  };

  const submitWord = async () => {
    if (changedIndexes.length === 0) return;
    setMoves((m) => m + 1);
    if (!doesPathExists(difficulty, inputWord, endWord)) {
      setHintError("No path exists between the words");
      setPenalties((p) => p + 1);
      return;
    } else if (inputWord === endWord) {
      // game completed
      setLoading(true);
      localStorage.removeItem("userGame" + difficulty);
      submitUserGame(startWord, endWord, moves + 1, penalties, hintsUsed).then(
        (results) => {
          setCompletedGameResult(results);
          setShowCompletedGameMessage(true);
          setPreviousWord(inputWord);
          setChangedIndexes([]);
          setActive(-1);
          setHint("");
          setHintError("");
          setHintsUsed(0);
          setPenalties(0);
          setMoves(0);
        }
      );
      setLoading(false);
      return;
    }
    setPreviousWord(inputWord);
    setChangedIndexes([]);
    setActive(-1);
    setHint("");
    setHintError("");
  };

  const giveHint = async () => {
    if (hint == null) return setHint("");
    if (hint !== "") return;
    if (previousWord === endWord || inputWord === endWord) return;
    if (hints - hintsUsed <= 0) {
      setHintError("You don't have Hints remaining, buy more from the store.");
    } else {
      setLoading(true);
      const data = await getHint(difficulty, previousWord, endWord);
      setHint(data.hint);
      setHintsUsed((h) => h + 1);
      setLoading(false);
    }
  };

  const saveGameState = () => {
    localStorage.setItem(
      "userGame" + difficulty,
      JSON.stringify({
        start: startWord,
        end: endWord,
        previous: previousWord,
        input: inputWord,
        changedIndexes: changedIndexes,
        active: active,
        hint: hint,
        hintError: hintError,
        hintsUsed: hintsUsed,
        penalties: penalties,
        moves: moves,
      })
    );
    updateUserGames();
  };

  // useeffect for every change in game state
  useEffect(() => {
    if (startWord === "" || endWord === "") return;
    saveGameState();
  }, [
    startWord,
    endWord,
    previousWord,
    inputWord,
    changedIndexes,
    active,
    hint,
    hintError,
    hintsUsed,
    penalties,
    moves,
  ]);

  // useeffect for first render
  useEffect(() => {
    const userGame = JSON.parse(localStorage.getItem("userGame" + difficulty));
    if (userGame && !(userGame.input === userGame.end)) {
      setStartWord(userGame.start);
      setEndWord(userGame.end);
      setPreviousWord(userGame.previous);
      setInputWord(userGame.input);
      setChangedIndexes(userGame.changedIndexes);
      setActive(userGame.active);
      setHint(userGame.hint);
      setHintError(userGame.hintError);
      setHintsUsed(userGame.hintsUsed);
      setPenalties(userGame.penalties);
      setMoves(userGame.moves);
      setShowCompletedGameMessage(userGame.showCompletedGameMessage);
      setCompletedGameResult(userGame.completedGameResult);
      if (!userGame.showCompletedGameMessage) setShowOldGameMessage(true);
    } else {
      getWordsPair();
      setShowOldGameMessage(false);
      setHintsUsed(0);
      setPenalties(0);
      setMoves(0);
    }
  }, []);

  return (
    <div className={styles.layout}>
      {loading && <Loading />}
      {showOldGameMessage && (
        <InfoDialogBox
          info="Game loaded from where you left last time."
          onAccept={() => setShowOldGameMessage(false)}
        />
      )}
      {showCompletedGameMessage && (
        <GameCompleteDialogBox
          onPlayAgain={() => {
            setShowCompletedGameMessage(false);
            setCompletedGameResult(null);
            updateCurrentUser();
            getWordsPair();
          }}
          gameChanges={completedGameResult.gameChanges}
        />
      )}
      <div className={styles.top}>
        <div className={homeStyles.topLeft}>
          <div className={homeStyles.xpDiv}>
            <img
              className={homeStyles.xpBadge}
              src={getXPBadge()}
              alt="bolt"
            ></img>
            <div className={homeStyles.xpText}>{name}</div>
          </div>
          <div className={homeStyles.progressBar}>
            <img className={homeStyles.boltImage} src={bolt} alt="bolt"></img>
            <div
              className={homeStyles.progressBarInner}
              style={{ width: `${getPercentageLevelComplete()}%` }}
            ></div>
          </div>
          <div className={homeStyles.levelText}>
            {getRequiredXP()} XP to level {currentLevel + 1}
          </div>
        </div>
        <div className={homeStyles.topRight}>
          <div className={homeStyles.coins}>
            <img
              className={homeStyles.coinImage}
              src={coinImage}
              alt="coin"
            ></img>
            {coins}
          </div>
          <div className={homeStyles.coins}>
            <img
              className={homeStyles.coinImage}
              src={hintImage}
              alt="hint"
            ></img>
            {Math.max(0, hints - userGamesCommons.hintsUsed)}
          </div>
        </div>
      </div>
      <div className={styles.extraButtons}>
        <div style={{ flex: 1 }}>
          <div className={styles.targetText}>
            Target <br />
            <span>{endWord}</span>
          </div>
        </div>
        <div className={styles.hintButton} onClick={() => giveHint()}>
          <img className={styles.hintBulb} src={hintImage} alt="hint"></img>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.wordInput}>
          {inputWord.split("").map((letter, index) => {
            return (
              <div
                className={
                  styles.letterInput +
                  " " +
                  (active === index ? styles.letterInputActive : "") +
                  " " +
                  (changedIndexes.includes(index)
                    ? styles.letterInputChanged
                    : "")
                }
                key={index}
                onClick={(e) => setActive(index)}
              >
                {letter}
              </div>
            );
          })}
        </div>
        {hint !== "" && (
          <div className={styles.hintBox}>
            <div className={styles.hintText}>{hint}</div>
          </div>
        )}
        {hintError !== "" && (
          <div className={styles.hintBox}>
            <div className={styles.hintErrorText}>{hintError}</div>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.keyboard}>
          <div className={styles.key} onClick={() => changeLetter("q")}>
            Q
          </div>
          <div className={styles.key} onClick={() => changeLetter("w")}>
            W
          </div>
          <div className={styles.key} onClick={() => changeLetter("e")}>
            E
          </div>
          <div className={styles.key} onClick={() => changeLetter("r")}>
            R
          </div>
          <div className={styles.key} onClick={() => changeLetter("t")}>
            T
          </div>
          <div className={styles.key} onClick={() => changeLetter("y")}>
            Y
          </div>
          <div className={styles.key} onClick={() => changeLetter("u")}>
            U
          </div>
          <div className={styles.key} onClick={() => changeLetter("i")}>
            I
          </div>
          <div className={styles.key} onClick={() => changeLetter("o")}>
            O
          </div>
          <div className={styles.key} onClick={() => changeLetter("p")}>
            P
          </div>
          <div className={styles.emptyKey}></div>
          <div className={styles.key} onClick={() => changeLetter("a")}>
            A
          </div>
          <div className={styles.key} onClick={() => changeLetter("s")}>
            S
          </div>
          <div className={styles.key} onClick={() => changeLetter("d")}>
            D
          </div>
          <div className={styles.key} onClick={() => changeLetter("f")}>
            F
          </div>
          <div className={styles.key} onClick={() => changeLetter("g")}>
            G
          </div>
          <div className={styles.key} onClick={() => changeLetter("h")}>
            H
          </div>
          <div className={styles.key} onClick={() => changeLetter("j")}>
            J
          </div>
          <div className={styles.key} onClick={() => changeLetter("k")}>
            K
          </div>
          <div className={styles.key} onClick={() => changeLetter("l")}>
            L
          </div>
          <div className={styles.emptyKey}></div>
          <div
            className={styles.keyMedium + " " + styles.key}
            onClick={() => submitWord()}
          >
            ENTER
          </div>
          <div className={styles.key} onClick={() => changeLetter("z")}>
            Z
          </div>
          <div className={styles.key} onClick={() => changeLetter("x")}>
            X
          </div>
          <div className={styles.key} onClick={() => changeLetter("c")}>
            C
          </div>
          <div className={styles.key} onClick={() => changeLetter("v")}>
            V
          </div>
          <div className={styles.key} onClick={() => changeLetter("b")}>
            B
          </div>
          <div className={styles.key} onClick={() => changeLetter("n")}>
            N
          </div>
          <div className={styles.key} onClick={() => changeLetter("m")}>
            M
          </div>
          <div
            className={styles.keyMedium + " " + styles.key}
            onClick={() => removeLetter()}
          >
            ERASE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
