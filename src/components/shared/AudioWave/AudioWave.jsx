import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import toastr from "toastr";

const formWaveSurferOptions = (ref, waveColor, interact) => ({
  container: ref,
  waveColor,
  progressColor: waveColor,
  cursorColor: "#ddd",
  barWidth: 4,
  barRadius: 4,
  responsive: true,
  height: 25,
  normalize: true,
  partialRender: true,
  hideScrollbar: true,
  interact
});

export default function AudioWave({id, url, waveColor = '#fff', interact = true}) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    create();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    if (wavesurfer.current) {
      wavesurfer.current.destroy()
    }

    const options = formWaveSurferOptions(waveformRef.current, waveColor);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.loadArrayBuffer(_base64ToArrayBuffer(url));
    wavesurfer.current.on('finish', () => {
      setIsPlaying(false);
    })
  };

  function _base64ToArrayBuffer(base64) {
    try {
      let binary_string = window.atob(base64);
      let len = binary_string.length;
      let bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (error) {
      toastr.error('Array Buffer Error!')
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  return (
    <div className={'w-full flex'}>
      <button type={'button'} className={'mr-2'} onClick={handlePlayPause}>
        {
          !isPlaying
            ? <FontAwesomeIcon icon={faPlay}/>
            : <FontAwesomeIcon icon={faPause}/>
        }
      </button>
      <div id={id + '-waveform'} className={'w-full relative'} ref={waveformRef}>
        <div className="line bg-white h-[1px] -z-1 rounded-full w-full absolute top-1/2 -translate-y-1/2"/>
      </div>
    </div>
  );
}