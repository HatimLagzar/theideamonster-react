import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CreateBasket.module.css';

function CreateBasket({ basket, setShowCreateBasketForm }) {
  return (
    <div
      onClick={() => {
        setShowCreateBasketForm(true);
      }}
      className={
        styles.basket + ' flex flex-col items-center justify-end lg:w-1/3 w-1/2'
      }
    >
      <div className={'relative'}>
        <img 
          className={styles.image}
          src='images/basket-dimmed.png'
          alt='Create Basket'
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={faPlusCircle}
          color={'#5a62cf'}
        />
      </div>
      <p className={styles.title + ' rounded-full text-white mb-0'}>
        Create Basket
      </p>
    </div>
  );
};

export default CreateBasket;