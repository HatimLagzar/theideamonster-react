import styles from './show-delegable.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import TaskItem from '../TaskItem/TaskItem';
import FloatingWrapper from "../../shared/FloatingWrapper/FloatingWrapper";

export default function ShowDelegable({delegable, setSelectedBasket, delegables, setDelegables, setSelectedProfile}) {
  /**
   * @param task {Object}
   * @param isChecked {boolean}
   */
  function handleChangeStatus(task, isChecked) {
    setDelegables([
      ...delegables.filter(item => item.id !== delegable.id),
      {
        ...delegable,
        tasks: [
          ...delegable.tasks.filter(item => item.id !== task.id),
          {
            ...task,
            done: isChecked
          }
        ]
      }
    ].sort((a, b) => (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime()));

    setSelectedBasket({
      ...delegable,
      tasks: [
        ...delegable.tasks.filter(item => item.id !== task.id),
        {
          ...task,
          done: isChecked
        }
      ]
    })
  }

  return (
    <FloatingWrapper>
      <button
        className={'absolute top-1 right-2 text-sm'}
        onClick={() => {
          setSelectedBasket(null);
        }}
      >
        <FontAwesomeIcon icon={faClose}/>
      </button>
      <h3 className={styles.title + ' text-2xl text-white text-center mb-2'}>
        {delegable.name}
      </h3>

      <p className={'text-center text-white text-base mb-3'}>
        Delegated to{' '}
        <button
          className={'font-semibold underline'}
          onClick={() => {
            setSelectedProfile(delegable.profile);
          }}
        >
          {delegable.profile.job}
        </button>
        <span className={'text-xs text-gray-200'}> (edit name)</span>
      </p>

      <ul className={'mb-3'}>
        {delegable.tasks.length > 0
          ? delegable.tasks.map((task, index) => {
            return <TaskItem key={task.id + '-task'}
                             task={task}
                             handleCheckboxChange={handleChangeStatus}
                             canDeleteTask={false}
                             canEditTask={false}
                             handleStatus
            />;
          })
          : ''}
      </ul>
    </FloatingWrapper>
  );
}
