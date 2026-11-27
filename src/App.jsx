import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import './App.css';

// List of 5-letter words
const WORDS = ["APPLE", "CRAZY", "GRAPE", "MANGO","EARTH", "GAMES", "DREAM", "WATER",
  "WORLD", "MOUSE", "CARDS", "LIGHT"];

function App() {

  // Select a random word
  const [solutionWord, setSolutionWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );

  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS');
  const [message, setMessage] = useState('');

  // Handle keyboard input
  const handleKeyPress = (key) => {

    if (gameStatus !== 'IN_PROGRESS') {
      return;
    }

    // Add letters
    if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key.toUpperCase());
      }
    }

    // Remove letters
    else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    }

    // Submit the word
    else if (key === 'Enter') {
      if (currentGuess.length !== 5) {
        setMessage('Enter a 5-letter word!');
        return;
      }

      const newGuesses = [...pastGuesses, currentGuess];

      setPastGuesses(newGuesses);
      setCurrentGuess('');
      setMessage('');

      // Check if the player wins
      if (currentGuess === solutionWord) {
        setGameStatus('WON');
      }

      // Check if the player loses
      else if (newGuesses.length === 6) {
        setGameStatus('LOST');
      }
    }
  };

  // Listen to keyboard keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  // Restart the game
  const restartGame = () => {
    let newWord = solutionWord;
    while (newWord === solutionWord) {
      newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    setSolutionWord(newWord);
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
    setMessage('');
  };

  return (
    <div className="app">
      <h1>WORDLE</h1>
      <p className="subtitle">Guess the hidden 5-letter word!</p>
      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solutionWord={solutionWord}
      />

      <Keyboard
        onKeyPress={handleKeyPress}
        pastGuesses={pastGuesses}
        solutionWord={solutionWord}
      />

      {message && <p className="message">{message}</p>}
      {gameStatus !== 'IN_PROGRESS' && (
        <div className="game-over">

          <h2>
            {gameStatus === 'WON'
              ? 'Congratulations! You Won!'
              : 'Game Over!'}
          </h2>
          <p>The correct word was: {solutionWord}</p>

          <button onClick={restartGame}>
            Play Again
          </button>

        </div>
      )}

    </div>
  );
}

export default App;
