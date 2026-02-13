import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import useSound from 'use-sound';

const SingleSoundContext = createContext(null);

export function SingleSoundProvider({ children }) {
  const currentRef = useRef(null);

  const requestPlay = useCallback((soundId, playFn, stopFn) => {
    if (currentRef.current?.soundId === soundId) return;
    if (currentRef.current) currentRef.current.stop();
    currentRef.current = { soundId, stop: stopFn };
    playFn();
  }, []);

  const clearCurrent = useCallback((soundId) => {
    if (currentRef.current?.soundId === soundId) currentRef.current = null;
  }, []);

  return (
    <SingleSoundContext.Provider value={{ requestPlay, clearCurrent }}>
      {children}
    </SingleSoundContext.Provider>
  );
}

export function useSingleSound(soundId, url, options = {}) {
  const [play, { sound, stop }] = useSound(url, { ...options, interrupt: false });
  const { requestPlay, clearCurrent } = useContext(SingleSoundContext);
  const playRef = useRef(play);
  const stopRef = useRef(stop);
  playRef.current = play;
  stopRef.current = stop;

  useEffect(() => {
    if (!sound) return;
    const onEnd = () => clearCurrent(soundId);
    sound.on('end', onEnd);
    return () => sound.off('end', onEnd);
  }, [sound, soundId, clearCurrent]);

  const wrappedPlay = useCallback(() => {
    requestPlay(soundId, () => playRef.current(), stopRef.current);
  }, [soundId, requestPlay]);

  return [wrappedPlay];
}
