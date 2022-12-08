import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStop} from "@fortawesome/free-solid-svg-icons";

export default function RecordControls({startTime, handleStopRecording}) {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      startTime.add(1, "second");
      setElapsedTime(startTime.format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  });

  return <div className={'record-controls'}>
    <p className={'text-2xl text-center'}>{elapsedTime}</p>
    <button
      type={'button'}
      onClick={handleStopRecording}
      className={'block mx-auto mb-4 mt-2 px-3 py-1 rounded-full bg-white'}><FontAwesomeIcon icon={faStop} color={'red'} size={'sm'}/>
    </button>
  </div>
}