import styles from './basket-todos.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose, faMicrophone, faPencil} from '@fortawesome/free-solid-svg-icons';
import TaskItem from '../TaskItem/TaskItem';
import {
  setSelectedBasket,
  setShowRecordNewIdeaForm,
  setShowWriteNewIdeaForm,
} from '../../../store/features/tasks/basketsSlice';
import {useDispatch} from 'react-redux';
import FloatingWrapper from '../../shared/FloatingWrapper/FloatingWrapper';

export default function BasketTodos({ basket }) {
  const dispatch = useDispatch();

  function handleWriteNewIdea() {
    dispatch(setShowWriteNewIdeaForm(true));
    dispatch(setShowRecordNewIdeaForm(false));
  }

  function handleRecordNewIdea() {
    dispatch(setShowRecordNewIdeaForm(true));
    dispatch(setShowWriteNewIdeaForm(false));
  }

  return (
    <FloatingWrapper>
      <button
        className={'absolute p-3 top-0 right-0 text-sm'}
        onClick={() => {
          dispatch(setSelectedBasket(null));
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h3 className={styles.title + ' text-2xl text-white text-center mb-3'}>
        {basket.content}
      </h3>

      <ul>
        {basket.tasks.length > 0
          ? basket.tasks.map((task, index) => {
              return <TaskItem key={task.id + '-task'} task={task} />;
            })
          : ''}
      </ul>

      <div className="flex justify-center mt-3 rounded-full shadow-xl w-full md:w-2/5 mx-auto">
        <button
          className='block text-sm py-2 px-3 text-center focus-visible:outline-0  rounded-r-none border-r border-indigo-500'
          onClick={handleWriteNewIdea}
        >
          <FontAwesomeIcon icon={faPencil} />
          <span className={'ml-2 font-montserrat'}>Write Idea</span>
        </button>
        <button
          className='block text-sm py-2 px-3 text-center focus-visible:outline-0 rounded-full rounded-l-none'
          onClick={handleRecordNewIdea}
        >
          <FontAwesomeIcon icon={faMicrophone} />
          <span className={'ml-2 font-montserrat'}>Record Idea</span>
        </button>
      </div>
    </FloatingWrapper>
  );
}
