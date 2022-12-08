import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faMicrophone, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {createTask} from "../../../api/tasks-api";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import toastr from "toastr";
import {setBaskets, setSelectedBasket, setShowRecordNewIdeaForm} from "../../../store/features/tasks/basketsSlice";
import audioRecorder from "../../../utils/audio/audio-recorder";
import RecordControls from "../RecordControls/RecordControls";
import moment from "moment";

export default function RecordNewIdeaForm() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baskets = useSelector(state => state.baskets.baskets);
  const selectedBasket = useSelector(state => state.baskets.selectedBasket);
  const dispatch = useDispatch();

  function handleCreateTask(audioAsBlob) {
    setIsLoading(true);

    createTask(selectedBasket.id, audioAsBlob, 2)
      .then(response => {
        setIsLoading(false);
        const filteredBaskets = baskets.filter(item => item.id !== selectedBasket.id);
        dispatch(setSelectedBasket({...selectedBasket, tasks: [...selectedBasket.tasks, response.data.task]}));
        dispatch(setBaskets([...filteredBaskets, {
          ...selectedBasket,
          tasks: [...selectedBasket.tasks, response.data.task]
        }]));
        dispatch(setShowRecordNewIdeaForm(false));
      })
      .catch(error => {
        setIsLoading(false);

        if (error && error.response && error.response.data) {
          toastr.error(error.response.data.message);
        } else {
          toastr.error('Error occurred, please retry later!');
        }

        console.log(error)
      })
  }

  function startAudioRecording() {
    audioRecorder.start()
      .then(() => {
        setIsRecording(true);
      })
      .catch(error => { //on error
        //No Browser Support Error
        if (error.message.includes("mediaDevices API or getUserMedia method is not supported in this browser.")) {
          console.log("To record audio, use browsers like Chrome and Firefox.");
          alert('To record audio, please use browsers like Chrome, Safari and Firefox.')
        }

        //Error handling structure
        switch (error.name) {
          case 'AbortError': //error from navigator.mediaDevices.getUserMedia
            console.log("An AbortError has occurred.");
            break;
          case 'NotAllowedError': //error from navigator.mediaDevices.getUserMedia
            console.log("A NotAllowedError has occurred. User might have denied permission.");
            break;
          case 'NotFoundError': //error from navigator.mediaDevices.getUserMedia
            console.log("A NotFoundError has occurred.");
            break;
          case 'NotReadableError': //error from navigator.mediaDevices.getUserMedia
            console.log("A NotReadableError has occurred.");
            break;
          case 'SecurityError': //error from navigator.mediaDevices.getUserMedia or from the MediaRecorder.start
            console.log("A SecurityError has occurred.");
            break;
          case 'TypeError': //error from navigator.mediaDevices.getUserMedia
            console.log("A TypeError has occurred.");
            break;
          case 'InvalidStateError': //error from the MediaRecorder.start
            console.log("An InvalidStateError has occurred.");
            break;
          case 'UnknownError': //error from the MediaRecorder.start
            console.log("An UnknownError has occurred.");
            break;
          default:
            console.log("An error occurred with the error name " + error.name);
        }
      });
  }

  function handleStopRecording() {
    audioRecorder.stop()
      .then((audioAsBlob) => {
        setIsRecording(false);
        handleCreateTask(audioAsBlob)
      })
      .catch((error) => {
        console.log(error);
        alert('Error occurred while recording your idea, please report this bug.');
      })
  }

  return <div
    className={'bg-main w-2/3 rounded-lg px-5 py-3 fixed z-10 bottom-2/4 left-1/2 -translate-x-1/2 shadow-2xl'}>
    <button className={'absolute top-1 right-2 text-sm'} onClick={() => {
      dispatch(setShowRecordNewIdeaForm(false))
    }}>
      <FontAwesomeIcon icon={faClose}/>
    </button>

    <form onSubmit={e => e.preventDefault()} className={'mt-3'}>
      {
        isRecording
          ? <RecordControls handleStopRecording={handleStopRecording} startTime={moment('00:00:00', 'hh:mm:ss')}/>
          : <>
            <button onClick={startAudioRecording} type={'button'}
                    className={'shadow bg-indigo-600 rounded-full py-3 px-4 mb-5 mx-auto block'}>
              <FontAwesomeIcon icon={faMicrophone} size={'lg'}/>
            </button>
            <button className={'shadow py-1 px-4 rounded mx-auto block'}>
              {!isLoading
                ? <>
                  <FontAwesomeIcon icon={faCheck}/> Done
                </>
                : <FontAwesomeIcon icon={faSpinner} spin={true}/>}
            </button>
          </>
      }
    </form>
  </div>
}