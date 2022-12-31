import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { DELEGATED_TASKS_DETAILS } from "../../../utils/constants/delegator";
import TaskItem from "../TaskItem/TaskItem";
import toastr from "toastr";

export default function SelectBasketTasks({ selectedBasket, setStep, handleSelectTask, selectedTasks }) {
  return <>
    <h3 className={'text-2xl text-white text-center mb-3'}>
      {selectedBasket.name} - Please select tasks
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
                handleCheckboxChange={handleSelectTask} />;
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
          onClick={() => {
            if (selectedTasks.length === 0) {
              toastr.warning('Please select the tasks you want to delegate by checking the boxes on the left of the tasks!');

              return;
            }

            setStep(DELEGATED_TASKS_DETAILS)
          }}
        >
          Next <FontAwesomeIcon icon={faArrowRightLong} size={'1x'} />
        </button>
        : ''
    }
  </>
}