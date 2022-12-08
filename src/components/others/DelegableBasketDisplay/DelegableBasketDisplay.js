import styles from './DelegableBasketDisplay.module.css';

export default function DelegableBasketDisplay({delegable, selectBasketHandler}) {
  return (
    <div
      className={
        styles.basket +
        ' flex flex-col items-center justify-end cursor-pointer lg:w-1/3 w-1/2'
      }
      onClick={() => selectBasketHandler()}
    >
      <div className="relative">
        <span className={styles.counter + ' rounded-full text-white text-center absolute bottom-0'}>
          {delegable.tasks.length}
        </span>
        <img className={styles.avatar} src={`/images/avatars/${delegable.profile.avatar}.png`} alt='Basket'/>
        <img className={styles.image} src={`/images/basket.png`} alt='Basket'/>
      </div>
      <p className={styles.title + ' rounded-full text-white mb-0'}>
        {delegable.name}
      </p>
    </div>
  );
}
