
function Keyboard({ onKeyPress, pastGuesses, solutionWord }) {

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];

  const getKeyStatus = (key) => {
    let bestStatus = '';

    pastGuesses.forEach((guess) => {
      const letters = guess.split('');
      const remaining = solutionWord.split('');
      const statuses = Array(5).fill('');

      letters.forEach((letter, index) => {
        if (letter === solutionWord[index]) {
          statuses[index] = 'correct';
          remaining[index] = null;
        }
      });

      letters.forEach((letter, index) => {
        if (statuses[index] === '') {
          const foundIndex = remaining.indexOf(letter);

          if (foundIndex !== -1) {
            statuses[index] = 'present';
            remaining[foundIndex] = null;
          } else {
            statuses[index] = 'absent';
          }
        }
      });

      letters.forEach((letter, index) => {
        if (letter === key) {
          const status = statuses[index];

          if (status === 'correct') bestStatus = 'correct';
          else if (status === 'present' && bestStatus !== 'correct') {
            bestStatus = 'present';
          }
          else if (status === 'absent' && bestStatus === '') {
            bestStatus = 'absent';
          }
        }
      });
    });

    return bestStatus;
  };

  return (
    <div className="keyboard">

      {keyboardRows.map((row, index) => (
        <div className="keyboard-row" key={index}>

          {row.map((key) => (
            <button
              key={key}
              className={`key ${getKeyStatus(key)}`}
              onClick={() => onKeyPress(key)}
            >
              {key === 'Backspace' ? '⌫' : key}
            </button>
          ))}

        </div>
      ))}

    </div>
  );
}

export default Keyboard;
