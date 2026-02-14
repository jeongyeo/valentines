import './App.css';
import { useState, useRef, useEffect } from 'react';
import useSound from 'use-sound';

const phrases = [
  "No",
  "Nah I'm good",
  "Pretty please? 😢",
  "I'm going to be sad 😭",
  "You're hurting my head 😱",
  "Catch me",
];

const CATS = {
  happy: {
    gif: '/images/happy.gif',
    mp3: '/sounds/happy.mp3',
  },
  dancing: {
    mp4: '/videos/dancing.mp4',
  },
  huh: {
    gif: '/images/huh.gif',
    mp3: '/sounds/huh.mp3',
  },
  headache: {
    mp4: '/videos/headache.mp4',
  },
  oiiaStanding: {
    gif: '/images/oiia-standing.gif',
  },
  oiiaSpinning: {
    gif: '/images/oiia-spinning.gif',
    mp3: '/sounds/oiia.mp3',
  },
  sad: {
    gif: '/images/sad.gif',
    mp3: '/sounds/sad.mp3',
  },
  suspicious: {
    gif: '/images/suspicious.gif',
    mp3: '/sounds/suspicious.mp3',
  },
};

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isDancingMuted, setIsDancingMuted] = useState(true);
  const [oiiaPosition, setOiiaPosition] = useState({ x: 0, y: 0 });
  const [isOiiaMoving, setIsOiiaMoving] = useState(false);
  const isOiiaMovingRef = useRef(false);
  const [oiiaCount, setOiiaCount] = useState(0);
  const happyGifRef = useRef(null);
  const dancingVideoRef = useRef(null);
  const oiiaDivRef = useRef(null);
  const [playHappyCatSound, { stop: stopHappyCatSound }] = useSound(CATS.happy.mp3, { loop: true, interrupt: true });
  const [playHuhSound, { stop: stopHuhSound }] = useSound(CATS.huh.mp3);
  const [playSuspiciousSound, { stop: stopSuspiciousSound }] = useSound(CATS.suspicious.mp3);
  const [playSadSound, { stop: stopSadSound }] = useSound(CATS.sad.mp3);
  const [playOiiaSound, { stop: stopOiiaSound }] = useSound(CATS.oiiaSpinning.mp3);

  useEffect(() => {
    stopHuhSound();
    stopSuspiciousSound();
    stopSadSound();
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
      } else if (noCount === 4) {
        setOiiaPosition({ x: window.innerWidth / 2 - 45, y: window.innerHeight / 2 - 125 });
      }

      setNoCount(noCount + 1);
    }
  }

  function onOiiaClick() {
    if (isOiiaMovingRef.current) return;
    const divElement = oiiaDivRef.current;
    if (!divElement) return;

    // Get the div's natural dimensions
    const divWidth = divElement.offsetWidth;
    const divHeight = divElement.offsetHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate max position ensuring div stays within viewport
    const maxX = Math.max(0, viewportWidth - divWidth);
    const maxY = Math.max(0, viewportHeight - divHeight);

    // Ensure new position is at least 50% of screen away from current position
    let randomX, randomY;
    const minDistanceX = viewportWidth * 0.25;
    const minDistanceY = viewportHeight * 0.25;
    const currentX = oiiaPosition.x;
    const currentY = oiiaPosition.y;

    do {
      randomX = Math.random() * maxX;
      randomY = Math.random() * maxY;
    } while (
      Math.abs(randomX - currentX) < minDistanceX &&
      Math.abs(randomY - currentY) < minDistanceY
    );

    setOiiaPosition({ x: randomX, y: randomY });
    isOiiaMovingRef.current = true;
    playOiiaSound();
    setOiiaCount(oiiaCount + 1);
  }

  function onOiiaMovementFinished(event) {
    if (event.propertyName === 'left') {
      stopOiiaSound();
      isOiiaMovingRef.current = false;
      if (oiiaCount >= 5) {
        setTimeout(() => {
          onOiiaClick();
        }, 200);
      }
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
            {noCount === 5 ? (
              <div
                ref={oiiaDivRef}
                style={{
                  position: 'fixed',
                  left: `${oiiaPosition.x}px`,
                  top: `${oiiaPosition.y}px`,
                  transition: 'left 1.5s ease-in-out, top 1.5s ease-in-out'
                }}
                onClick={onOiiaClick}
                onTransitionEnd={onOiiaMovementFinished}
              >
                {isOiiaMovingRef.current ? (
                  <img
                    src={CATS.oiiaSpinning.gif}
                    className='oiia-dancing'
                  />
                ) : (
                  <>
                    <img
                      src={CATS.oiiaStanding.gif}
                      className='oiia-standing'
                    />
                    <button
                      className='noButton button'
                    >
                      {getNoButtonText()}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <button
                className='noButton button'
                onClick={() => handleNoClick()}
              >
                {getNoButtonText()}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
