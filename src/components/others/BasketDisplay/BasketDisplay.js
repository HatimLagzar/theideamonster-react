import styles from './BasketDisplay.module.css';

export default function BasketDisplay({ basket, selectBasketHandler }) {
  return (
    <div
      className={
        styles.basket +
        ' flex flex-col items-center justify-end cursor-pointer lg:w-1/3 w-1/2 relative'
      }
      onClick={() => selectBasketHandler()}
    >
      {
        basket.logo && <img className={styles.logo} src={basket.logo} />
      }
      <span className={styles.counter + ' rounded-full text-white text-center'}>
        {basket.tasks.length}
      </span>
      <img className={styles.image} src='/images/basket.png' alt='Basket' />
      <p className={styles.title + ' rounded-full text-white mb-0'}>
        {basket.name}
      </p>
    </div>
  );
}
