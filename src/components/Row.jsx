
import Tile from './Tile';

function Row({ guess, solutionWord, isCurrent }) {

  const letters = guess.split('');

  const checkLetters = () => {
    const result = [];

    for (let i = 0; i < 5; i++) {

      if (letters[i] === solutionWord[i]) {
        result.push('correct');
      }

      else if (solutionWord.includes(letters[i])) {
        result.push('present');
      }

      else {
        result.push('absent');
      }
    }

    return result;
  };

  const colors = isCurrent ? [] : checkLetters();

  return (
    <div className="row">

      {Array.from({ length: 5 }).map((_, index) => (
        <Tile
          key={index}
          letter={letters[index] || ''}
          status={colors[index] || ''}
        />
      ))}

    </div>
  );
}

export default Row;
