import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './CreateDelegable.module.css';

export default function CreateDelegable({delegable, setShowCreateDelegableForm}) {
  return (
    <div
      onClick={() => {
        setShowCreateDelegableForm(true);
      }}
      className={
        styles.basket + ' flex flex-col items-center justify-end lg:w-1/3 w-1/2'
      }
    >
      <div className={'relative'}>
        <img 
          className={styles.image}
          src='/images/logo-holding-basket.png'
          alt='Create Delegable'
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={faPlusCircle}
          color={'#5a62cf'}
        />
      </div>
      <p className={styles.title + ' rounded-full text-white mb-0'}>
        Delegate a Task
      </p>
    </div>
  );
};
