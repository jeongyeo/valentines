import './App.css';
import { useState } from 'react';

const phrases = [
  "No",
  "Are you sure?",
  "Are you really sure?",
  "Pretty please?",
  "Pretty pretty please?",
  "You're so mean 😢",
  "I'm going to be sad 😭",
  "Yes is the only answer",
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function getNoButtonText() {
    return phrases[noCount % phrases.length];
  }

  return (
    <div className="container">
      {yesPressed ? (
        <>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
          />
          <h2>Yay! Lets go get some food now 🥘</h2>
        </>
      ) : (
        <>
          <img
            className='jumpingBearImg'
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
          />
          <h2>Will you be my valentine Soeun?</h2>
          <div className='buttonContainer'>
            <button
              className='yesButton button'
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              className='noButton button'
              onClick={() => handleNoClick()}
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
