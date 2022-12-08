import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { createRef, useEffect, useState } from 'react';
import MeditationFullScreen from '../MeditationFullScreen/MeditationFullScreen';

function MeditationTrack({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);

  const audioElement = createRef();

  useEffect(() => {
    if (audioElement && audioElement.current) {
      audioElement.current.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [isPlaying, audioElement]);

  return (
    <>
      <section
        className={
          'meditation-track w-[48%] p-3 shadow rounded-lg font-montserrat mb-3 border flex flex-col ' +
          (isPlaying ? 'bg-main cursor-pointer' : 'bg-[#F9F9F9]')
        }
        onClick={(e) => {
          if (e.currentTarget === e.target && isPlaying) {
            setShowFocusMode(true);
          }
        }}
      >
        <h3
          className={
            'text-lg font-montserrat ' +
            (isPlaying ? 'text-white' : 'text-black')
          }
        >
          {track.name}
        </h3>
        <p
          className={
            'text-xs mb-6 font-montserrat ' +
            (isPlaying ? 'text-gray-200' : 'text-gray-500')
          }
        >
          Duration: {track.duration}
        </p>

        <audio ref={audioElement} className={'hidden'} src={track.url} />

        <button
          className={
            'rounded-full shadow font-montserrat w-[38px] h-[38px] block ml-auto bg-main text-white mt-auto'
          }
          onClick={() => {
            if (isPlaying) {
              audioElement.current.pause();
              setIsPlaying(false);
            } else {
              audioElement.current.play();
              setIsPlaying(true);
              setShowFocusMode(true);
            }
          }}
        >
          {!isPlaying && <FontAwesomeIcon icon={faPlay} className={'ml-1'} />}
          {isPlaying && <FontAwesomeIcon icon={faPause} />}
        </button>
      </section>
      <MeditationFullScreen
        showFocusMode={showFocusMode}
        setShowFocusMode={setShowFocusMode}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioElement={audioElement}
        title={track.name}
      />
    </>
  );
}

export default MeditationTrack;
