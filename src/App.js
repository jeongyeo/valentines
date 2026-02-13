import './App.css';
import { useState } from 'react';
import { useSingleSound } from './SingleSoundContext';

const phrases = [
  "No",
  "Nah I'm good",
  "Are you really sure?",
  "Pretty please?",
  "Pretty pretty please?",
  "You're so mean 😢",
  "I'm going to be sad 😭",
  "Yes is the only answer",
];

const CATS = {
  happy: {
    id: 'happy',
    gif: '/images/happy.gif',
    mp3: '/sounds/happy.mp3',
  },
  dancing: {
    id: 'dancing',
    gif: '/images/dancing.gif',
    mp3: '/sounds/dancing.mp3', //chinese tiktok dance song
  },
  huh: {
    id: 'huh',
    gif: '/images/huh.gif',
    mp3: '/sounds/huh.mp3',
  },
  headache: {
    id: 'headache',
    gif: '/images/headache.png',
    mp3: '/sounds/headache.mp3',
  },
  oiia: {
    id: 'oiia',
    gif: '/images/oiia.gif',
    mp3: '/sounds/oiia.mp3',
  },
  sad: {
    id: 'sad',
    gif: '/images/sad.gif',
    mp3: '/sounds/sad.mp3',
  },
  suspicious: {
    id: 'suspicious',
    gif: '/images/suspicious.gif',
    mp3: '/sounds/suspicious.mp3',
  },
};

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [playHappyCatSound] = useSingleSound(CATS.happy.id, CATS.happy.mp3);

  function handleNoClick() {
    if (noCount < phrases.length - 1) {
      setNoCount(noCount + 1);
    }
  }

  function getNoButtonText() {
    return phrases[noCount % phrases.length];
  }

  return (
    <div className="container">
      {yesPressed ? (
        <>
          <img
            src={CATS.happy.gif}
            onClick={playHappyCatSound}
          />
          <h2>Yay! Lets go get some food now 🥘</h2>
        </>
      ) : (
        <>
          <img
            className='jumpingBearImg'
            src="/images/bear-roses.gif"
          />
          <h2>Will you be my valentine Soeun?</h2>
          <div className='buttonContainer'>
            <button
              className='yesButton button'
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
