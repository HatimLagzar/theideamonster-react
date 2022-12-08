import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { secondsToElapsedTimeFormat } from '../../../utils/formatters/time';

function MeditationFullScreen({
  title,
  isPlaying,
  setIsPlaying,
  audioElement,
  setShowFocusMode,
  showFocusMode,
}) {
  const [timeElapsed, setTimeElapsed] = useState(
    audioElement.current ? audioElement.current.currentTime : 0
  );

  const [totalTime, setTotalTime] = useState(
    audioElement.current ? audioElement.current.duration : 0
  );

  useEffect(() => {
    setTotalTime(audioElement.current ? audioElement.current.duration : 0);

    const interval = setInterval(() => {
      setTimeElapsed(
        audioElement.current ? Math.floor(audioElement.current.currentTime) : 0
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [audioElement]);

  return (
    <section
      className={
        'meditation-full-screen w-full h-screen px-7 bg-main text-white absolute top-0 left-0 z-20 flex-col justify-center items-center ' +
        (showFocusMode ? 'flex' : 'hidden')
      }
    >
      <h1 className={'text-3xl text-white text-center mb-5 mt-16'}>{title}</h1>
      <button
        className={
          'rounded-full shadow font-montserrat w-[70px] h-[70px] block mx-auto bg-white text-main mb-5'
        }
        onClick={() => {
          if (isPlaying) {
            audioElement.current.pause();
            setIsPlaying(false);
          } else {
            audioElement.current.play();
            setIsPlaying(true);
          }
        }}
      >
        {!isPlaying ? (
          <FontAwesomeIcon icon={faPlay} className={'ml-2'} size={'2x'} />
        ) : (
          <FontAwesomeIcon icon={faPause} size={'2x'} />
        )}
      </button>
      {timeElapsed === 0 ? (
        <p className={'text-center font-montserrat text-lg'}>
          --:-- / {secondsToElapsedTimeFormat(totalTime)}
        </p>
      ) : (
        <p className={'text-center font-montserrat text-lg'}>
          {secondsToElapsedTimeFormat(timeElapsed) +
            ' / ' +
            secondsToElapsedTimeFormat(totalTime)}
        </p>
      )}

      <button
        onClick={() => setShowFocusMode(false)}
        className={
          'bg-white text-black py-2 px-10 text-center shadow rounded mt-60'
        }
      >
        <FontAwesomeIcon icon={faDoorOpen} className={'mr-2'} /> Exit Focus Mode
      </button>
    </section>
  );
}

export default MeditationFullScreen;
