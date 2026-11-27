
import Row from './Row';

function GameBoard({ pastGuesses, currentGuess, solutionWord }) {

  return (
    <div className="game-board">

      {Array.from({ length: 6 }).map((_, index) => {

        const isCurrent = index === pastGuesses.length;

        const guess = pastGuesses[index] ||
          (isCurrent ? currentGuess : '');

        return (
          <Row
            key={index}
            guess={guess}
            solutionWord={solutionWord}
            isCurrent={isCurrent}
          />
        );
      })}

    </div>
  );
}

export default GameBoard;
