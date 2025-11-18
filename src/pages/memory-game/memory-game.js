/*
Build a game where player needs to match pair of cards
*/
import React, { useState, useEffect } from "react";
import { loadSvgs, shuffleArray, loadDefaultSvg } from "./utils";
import s from "./memory-games.module.css";

const MemoryGame = ({ win = 2 }) => {
  const [cardsArr, setCardsArr] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [defaultSvg, setDefaultSvg] = useState("");
  const [started, setStarted] = useState(false);
  const [prevCard, setPrevCard] = useState(null);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    loadSvgs()
      .then((list) => {
        const shuffled = shuffleArray([...list, ...list]);
        setCardsArr(shuffled);
        setFlipped(new Array(shuffled.length).fill(false));
      })
      .catch((err) => console.error("Couldn't load svgs: ", err));
    loadDefaultSvg()
      .then((img) => setDefaultSvg(img))
      .catch((err) => console.error("failed to load default svg: ", err));
  }, []);

  useEffect(() => {
    let start = null;
    let animationFrame;
    const updateTime = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      setTime(elapsed);
      if (timerRunning) {
        animationFrame = requestAnimationFrame(updateTime);
      }
    };
    if (timerRunning) {
      animationFrame = requestAnimationFrame(updateTime);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [timerRunning]);

  useEffect(() => {
    if (started && flipped.length > 0 && flipped.every((v) => v === true)) {
      setTimerRunning(false);
    }
  }, [flipped, started]);

  useEffect(() => {
    if (time >= 3600000) {
      handleReset();
    }
  });

  const formatTime = (ms) => {
    ms = Math.floor(ms);
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const handleReset = () => {
    setTimerRunning(false);
    setTime(0);
    setFlipped(new Array(cardsArr.length).fill(false));
    setStarted(false);
    setTimeout(() => {
      setCardsArr((prev) => shuffleArray(prev));
    }, 300);
  };
  const handleFlip = (index, cardId) => {
    setFlipped((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
    if (prevCard === null) {
      setPrevCard({ index, cardId });
    } else if (prevCard.cardId !== cardId) {
      setTimeout(() => {
        setFlipped((prev) => {
          const copy = [...prev];
          copy[index] = !copy[index];
          copy[prevCard.index] = !copy[prevCard.index];
          return copy;
        });
      }, 1000);
      setPrevCard(null);
    } else {
      setPrevCard(null);
    }
  };
  const handleStart = () => {
    setTime(0);
    setTimerRunning(true);
    setStarted(true);
  };
  return (
    <div className={s.container}>
      <h2>Memory Card</h2>
      <h3 className={s.timer}>Time: {formatTime(time)}</h3>
      <div className={s.cardConatiner}>
        {!started && (
          <div className={s.notStarted}>
            <button className={s.startBtn} onClick={() => handleStart()}>
              Start
            </button>
          </div>
        )}
        {cardsArr &&
          cardsArr.length > 0 &&
          cardsArr.map((card, idx) => {
            return (
              <div
                key={idx}
                className={`${s.card} ${flipped[idx] ? s.flip : ""}`}
                onClick={() => handleFlip(idx, card.id)}
                id={`${card.id}_${idx}`}
              >
                <div className={s.cardInner}>
                  <div className={s.cardFront}>
                    <img src={defaultSvg} className={s.cardImg} alt={card.id} />
                  </div>

                  <div className={s.cardBack}>
                    <img src={card.src} className={s.cardImg} alt={card.id} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <button onClick={() => handleReset()} className={s.resetBtn}>
        Reset
      </button>
    </div>
  );
};

export default MemoryGame;
