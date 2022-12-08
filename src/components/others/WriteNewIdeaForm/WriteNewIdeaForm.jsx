import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {createTask} from "../../../api/tasks-api";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import toastr from "toastr";
import {setBaskets, setSelectedBasket, setShowWriteNewIdeaForm} from "../../../store/features/tasks/basketsSlice";

export default function WriteNewIdeaForm() {
  const [taskDescription, setTaskDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const baskets = useSelector(state => state.baskets.baskets);
  const selectedBasket = useSelector(state => state.baskets.selectedBasket);
  const dispatch = useDispatch();

  function handleAddNewIdea(e) {
    e.preventDefault()

    setIsLoading(true);

    createTask(selectedBasket.id, taskDescription)
      .then(response => {
        setIsLoading(false);
        setTaskDescription('');
        const filteredBaskets = baskets.filter(item => item.id !== selectedBasket.id);
        dispatch(setSelectedBasket({...selectedBasket, tasks: [...selectedBasket.tasks, response.data.task]}));
        dispatch(setBaskets([...filteredBaskets, {
          ...selectedBasket,
          tasks: [...selectedBasket.tasks, response.data.task]
        }]));
        dispatch(setShowWriteNewIdeaForm(false));
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

  return <div className={'bg-main w-2/3 rounded-lg px-5 py-3 fixed z-10 bottom-2/4 left-1/2 -translate-x-1/2 shadow-2xl'}>
    <button className={'absolute top-1 right-2 text-sm'} onClick={() => {
      dispatch(setShowWriteNewIdeaForm(false))
    }}>
      <FontAwesomeIcon icon={faClose}/>
    </button>

    <form onSubmit={handleAddNewIdea} className={'mt-3'}>
      <textarea
        className={'w-full border border-white bg-[#626ad4] text-[#c1c4ec] px-2 py-3 focus-within:outline-0'}
        style={{borderWidth: '0.1px'}}
        placeholder={'Write my fist novel ideas and develop the main characters'}
        rows={5}
        defaultValue={taskDescription}
        onChange={e => setTaskDescription(e.currentTarget.value)}
        required
      ></textarea>
      <button className={'shadow py-1 px-4 rounded mx-auto block'}>
        {!isLoading
          ? <>
            <FontAwesomeIcon icon={faCheck}/> Done
          </>
          : <FontAwesomeIcon icon={faSpinner} spin={true}/>}
      </button>
    </form>
  </div>
}