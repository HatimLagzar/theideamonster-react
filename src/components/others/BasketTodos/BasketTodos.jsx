import styles from './basket-todos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMicrophone, faPencil, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TaskItem from '../TaskItem/TaskItem';
import {
  deleteBasket,
  setSelectedBasket,
  setShowRecordNewIdeaForm,
  setShowWriteNewIdeaForm,
} from '../../../store/features/tasks/basketsSlice';
import { useDispatch } from 'react-redux';
import FloatingWrapper from '../../shared/FloatingWrapper/FloatingWrapper';
import { deleteCategory } from '../../../api/categories-api';
import { useState } from 'react';
import toastr from 'toastr';

export default function BasketTodos({ basket }) {
  const dispatch = useDispatch();
  const [isDeletingBasket, setIsDeletingBasket] = useState(false);

  function handleWriteNewIdea() {
    dispatch(setShowWriteNewIdeaForm(true));
    dispatch(setShowRecordNewIdeaForm(false));
  }

  function handleRecordNewIdea() {
    dispatch(setShowRecordNewIdeaForm(true));
    dispatch(setShowWriteNewIdeaForm(false));
  }

  function handleDeleteBasket() {
    setIsDeletingBasket(true);
    deleteCategory(basket.id)
      .then(response => {
        setIsDeletingBasket(false);
        dispatch(setSelectedBasket(null));
        dispatch(deleteBasket(basket.id))
        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsDeletingBasket(false);
        if (error.response && error.response.data.message) {
          toastr.error(error.response.data.message || 'Failed to delete basket');
        }
      })
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

      <div className="flex justify-center mt-3 rounded-full shadow-xl mx-auto px-4">
        <button
          className='block text-sm py-1 px-2 text-center focus-visible:outline-0  rounded-r-none border-r border-indigo-500'
          onClick={handleWriteNewIdea}
        >
          <FontAwesomeIcon icon={faPencil} />
          <span className={'ml-2 font-montserrat'}>Write</span>
        </button>
        <button
          className='block text-sm py-1 px-2 text-center focus-visible:outline-0 rounded-full rounded-l-none'
          onClick={handleRecordNewIdea}
        >
          <FontAwesomeIcon icon={faMicrophone} />
          <span className={'ml-2 font-montserrat'}>Record</span>
        </button>
        <button
          className='block text-sm py-1 px-2 text-center focus-visible:outline-0 rounded-full rounded-l-none'
          onClick={handleDeleteBasket}
          disabled={isDeletingBasket}
        >
          {
            !isDeletingBasket
              ? <>
                <FontAwesomeIcon icon={faTrashAlt} />
                <span className={'ml-2 font-montserrat'}>Delete</span>
              </>
              : <>
                <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
              </>
          }
        </button>
      </div>
    </FloatingWrapper>
  );
}
