import styles from './basket-todos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faMicrophone,
  faPencil,
  faSpinner,
  faTrashAlt,
  faICursor,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import TaskItem from '../TaskItem/TaskItem';
import {
  deleteBasket, setBasketNewLogo,
  setBasketNewName,
  setSelectedBasket,
  setShowRecordNewIdeaForm,
  setShowWriteNewIdeaForm,
} from '../../../store/features/tasks/basketsSlice';
import { useDispatch } from 'react-redux';
import FloatingWrapper from '../../shared/FloatingWrapper/FloatingWrapper';
import { deleteCategory, updateCategory } from '../../../api/categories-api';
import { useState } from 'react';
import toastr from 'toastr';

export default function BasketTodos({ basket }) {
  const dispatch = useDispatch();
  const [isDeletingBasket, setIsDeletingBasket] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isUpdatingLogo, setIsUpdatingLogo] = useState(false);

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

  function handleRenameBasket(e) {
    if (e.currentTarget.value === basket.name) {
      return;
    }

    setIsRenaming(true);

    dispatch(setBasketNewName({ id: basket.id, name: e.currentTarget.value }));

    const formData = new FormData();
    formData.set('name', e.currentTarget.value);

    updateCategory(basket.id, formData)
      .then(response => {
        setIsRenaming(false);
        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsRenaming(false);
        if (error.response && error.response.data.message) {
          toastr.error(error.response.data.message || 'Failed to rename basket');
        }
      })
  }

  function handleUpdateLogo(e) {
    if (e.currentTarget.files.length === 0) {
      return;
    }

    setIsUpdatingLogo(true);

    const formData = new FormData();
    formData.set('name', basket.name);
    formData.set('logo', e.currentTarget.files[0]);

    updateCategory(basket.id, formData)
      .then(response => {
        setIsUpdatingLogo(false);
        dispatch(setBasketNewLogo({ id: basket.id, logo: response.data.basket.logo }));
        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsUpdatingLogo(false);
        if (error.response && error.response.data.message) {
          toastr.error(error.response.data.message || 'Failed to upload new basket logo!');
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

      <input
        onChange={handleUpdateLogo}
        style={{ display: 'none' }}
        accept={'image/*'}
        type="file"
        id={`basketLogo_${basket.id}`}
        disabled={isUpdatingLogo}
      />
      <label
        htmlFor={`basketLogo_${basket.id}`}
        className={'absolute p-3 top-0 left-0 text-sm cursor-pointer'}
      >
        {
          isUpdatingLogo
            ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            : <>
              {
                basket.logo
                  ? <img src={basket.logo} alt="Logo" style={{ maxHeight: '35px', maxWidth: '35px' }} />
                  : <FontAwesomeIcon icon={faImage} />
              }
            </>
        }
      </label>

      <h4
        className={styles.title + ' text-lg text-white text-center mb-3 hover:opacity-70 hover:cursor-text rounded-lg'}>
        <input
          type={'text'}
          className={'bg-transparent border-none outline-none text-center w-auto disabled:opacity-70'}
          maxLength={255}
          defaultValue={basket.name}
          onBlur={handleRenameBasket}
          disabled={isRenaming}
        />
      </h4>

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
