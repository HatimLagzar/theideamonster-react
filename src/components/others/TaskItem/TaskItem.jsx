import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {deleteTask, updateTask} from '../../../api/tasks-api';
import {useDispatch, useSelector} from 'react-redux';
import {setBaskets, setSelectedBasket, setTaskName,} from '../../../store/features/tasks/basketsSlice';
import toastr from 'toastr';
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox';
import {useState} from 'react';
import AudioWave from "../../shared/AudioWave/AudioWave";

export default function TaskItem({
                                   task,
                                   handleStatus = true,
                                   canEditTask = true,
                                   canDeleteTask = true,
                                   handleCheckboxChange = () => {
                                   },
                                 }) {
  const dispatch = useDispatch();
  const baskets = useSelector((state) => state.baskets.baskets);
  const selectedBasket = useSelector((state) => state.baskets.selectedBasket);
  const [taskDescription, setTaskDescription] = useState(task.content || '');

  function handleDeleteTask() {
    const filteredBaskets = baskets.filter(
      (item) => item.id !== task.category_id
    );
    const filteredTasks = selectedBasket.tasks.filter(
      (item) => item.id !== task.id
    );
    dispatch(
      setBaskets([
        ...filteredBaskets,
        {...selectedBasket, tasks: filteredTasks},
      ])
    );
    dispatch(setSelectedBasket({...selectedBasket, tasks: filteredTasks}));

    deleteTask(task.id).catch((error) => {
      if (error.response) {
        toastr.error(error.response.data.message);
      }

      console.log(error);
    });
  }

  function handleChangeTaskName() {
    dispatch(setTaskName({...task, name: taskDescription}));

    updateTask(task.id, taskDescription).catch((error) => {
      if (error.response) {
        toastr.error(error.response.data.message);
      }

      console.log(error);
    });
  }

  return (
    <li className={'flex py-1'}>
      <TaskCheckbox
        task={task}
        handleStatus={handleStatus}
        handleCheckboxChange={handleCheckboxChange}
      />
      {
        task.type === 1
          ? <input
            className={'bg-transparent border-b w-full focus-within:outline-0 ml-1'}
            type='text'
            defaultValue={taskDescription}
            onChange={(e) => setTaskDescription(e.currentTarget.value)}
            onBlur={() => handleChangeTaskName()}
            disabled={!canEditTask}
          />
          : <AudioWave id={task.id} url={task.content} />
      }

      {canDeleteTask ? (
        <button className={'px-2 ml-1'} onClick={() => handleDeleteTask()}>
          <FontAwesomeIcon icon={faClose}/>
        </button>
      ) : (
        ''
      )}
    </li>
  );
}
