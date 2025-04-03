import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const choices = [
  { name: "Rock", icon: <FaHandRock size={40} /> },
  { name: "Paper", icon: <FaHandPaper size={40} /> },
  { name: "Scissors", icon: <FaHandScissors size={40} /> },
];

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  // 🔊 Function to Play Sound Effects
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const playGame = (choice) => {
    playSound("/sounds/click.mp3"); // Play click sound on button press

    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerPick = choices[randomIndex].name;

    setPlayerChoice(choice);
    setComputerChoice(computerPick);

    if (choice === computerPick) {
      setResult("It's a Tie!");
      playSound("/sounds/tie.mp3");
    } else if (
      (choice === "Rock" && computerPick === "Scissors") ||
      (choice === "Paper" && computerPick === "Rock") ||
      (choice === "Scissors" && computerPick === "Paper")
    ) {
      setResult("You Win! 🎉");
      setPlayerScore((prev) => prev + 1);
      playSound("/sounds/win.mp3");
    } else {
      setResult("You Lose! 😢");
      setComputerScore((prev) => prev + 1);
      playSound("/sounds/lose.mp3");
    }
  };

  return (
    <div className="game-container">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        Rock, Paper, Scissors
      </motion.h1>

      <div className="choices">
        {choices.map(({ name, icon }) => (
          <motion.button
            key={name}
            className="choice-btn"
            onClick={() => playGame(name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {icon}
          </motion.button>
        ))}
      </div>

      {playerChoice && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="results"
        >
          <p>You chose: <strong>{playerChoice}</strong></p>
          <p>Computer chose: <strong>{computerChoice}</strong></p>
          <motion.h2 className="result"
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.4 }}
          >
            {result}
          </motion.h2>
        </motion.div>
      )}

      <div className="scoreboard">
        <p>Player Score: {playerScore}</p>
        <p>Computer Score: {computerScore}</p>
      </div>

      <motion.button
        className="reset-btn"
        onClick={() => setPlayerChoice(null)}
        whileHover={{ scale: 1.1 }}
      >
        Reset Game
      </motion.button>
    </div>
  );
};

export default Game;
