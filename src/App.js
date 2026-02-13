import './App.css';
import { useState, useRef, useEffect } from 'react';
import useSound from 'use-sound';

const phrases = [
  "No",
  "Nah I'm good",
  "Are you really sure?",
  "Pretty please?",
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
    mp4: '/videos/dancing.mp4',
  },
  huh: {
    id: 'huh',
    gif: '/images/huh.gif',
    mp3: '/sounds/huh.mp3',
  },
  headache: {
    id: 'headache',
    mp4: '/videos/headache.mp4',
  },
  oiiaStanding: {
    id: 'oiiaStanding',
    gif: '/images/oiia-standing.gif',
  },
  oiiaSpinning: {
    id: 'oiiaSpinning',
    gif: '/images/oiia-spinning.gif',
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
  const [isDancingMuted, setIsDancingMuted] = useState(true);
  const happyGifRef = useRef(null);
  const dancingVideoRef = useRef(null);
  const [playHappyCatSound, { stop: stopHappyCatSound }] = useSound(CATS.happy.mp3, { loop: true, interrupt: true });
  const [playHuhSound, { stop: stopHuhSound }] = useSound(CATS.huh.mp3);
  const [playSuspiciousSound, { stop: stopSuspiciousSound }] = useSound(CATS.suspicious.mp3);
  const [playSadSound, { stop: stopSadSound }] = useSound(CATS.sad.mp3);

  useEffect(() => {
    if (yesPressed) playHappyCatSound();
  }, [yesPressed, playHappyCatSound]);

  function handleHappyGifClick() {
    if (!isDancingMuted) {
      setIsDancingMuted(true);
      playHappyCatSound();
    }
  }

  function handleDancingVideoClick() {
    if (isDancingMuted) {
      setIsDancingMuted(false);
      stopHappyCatSound();
    }
  }

  function handleNoClick() {
    if (noCount < phrases.length - 1) {
      if (noCount === 0) {
        setTimeout(playHuhSound, 800);
      } else if (noCount === 1) {
        stopHuhSound();
        playSuspiciousSound();
      } else if (noCount === 2) {
        stopSuspiciousSound();
        playSadSound();
      } else if (noCount === 3) {
        stopSadSound();
      }

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
          <div className="mediaRow">
            <video
              ref={dancingVideoRef}
              src={CATS.dancing.mp4}
              loop
              autoPlay
              playsInline
              muted={isDancingMuted}
              onClick={handleDancingVideoClick}
              className="mediaItem"
            />
            <img
              ref={(happyGifRef)}
              src={CATS.happy.gif}
              onClick={handleHappyGifClick}
              className="mediaItem"
            />
          </div>
          <h2>Yay! Lets go get some food now 🥘</h2>
        </>
      ) : (
        <>
          {noCount === 5 ? (
            <></>
          ) : noCount === 4 ? (
            <video
              src={CATS.headache.mp4}
              loop
              autoPlay
              playsInline
              className="noImg"
              style={{ cursor: 'pointer' }}
            />
          ) : noCount === 3 ? (
            <img
              className='noImg'
              src={CATS.sad.gif}
            />
          ) : noCount === 2 ? (
            <img
              className='noImg'
              src={CATS.suspicious.gif}
            />
          ) : noCount === 1 ? (
            <img
              className='noImg'
              src={CATS.huh.gif}
            />
          ) : (
            <img
              className='noImg'
              src={'/images/bear-roses.gif'}
            />
          )}
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
