import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {DELEGATED_TASKS_DETAILS} from "../../../utils/constants/delegator";
import TaskItem from "../TaskItem/TaskItem";

export default function SelectBasketTasks({selectedBasket, setStep, handleSelectTask}) {
  return <>
    <h3 className={'text-2xl text-white text-center mb-3'}>
      {selectedBasket.name}
    </h3>
    {
      selectedBasket
        ? <ul>
          {selectedBasket.tasks.length > 0
            ? selectedBasket.tasks.map((task, index) => {
              return <TaskItem key={task.id + '-task'}
                               task={task}
                               canEditTask={false}
                               canDeleteTask={false}
                               handleStatus={false}
                               handleCheckboxChange={handleSelectTask}/>;
            })
            : ''}
        </ul>
        : ''
    }
    {
      selectedBasket.tasks instanceof Array && selectedBasket.tasks.length > 0
        ? <button
          key={'delegable-basket-next'}
          className={'inline-block ml-auto leading-none font-semibold font-montserrat mt-3'}
          onClick={() => setStep(DELEGATED_TASKS_DETAILS)}
        >
          Next <FontAwesomeIcon icon={faArrowRightLong} size={'1x'}/>
        </button>
        : ''
    }
  </>
}