import styles from '../styles/pages/start.module.css';
import {Link} from "react-router-dom";

function Start() {
  return (
    <div className={styles['start-page']}>
      <h1 className={'text-2xl text-black text-center ' + styles.title}>
        Taking action on your ideas has never been so easy
      </h1>

      <img
        className={styles.monster}
        src='images/start-page-character.png'
        alt='Character'
      />

      <span className={styles['monster-text']}>The Idea Basket</span>

      <Link to={'/login'} className={
        'text-3xl block py-3 px-5 mx-auto text-white mt-10 rounded-2xl ' +
        styles['start-btn']
      }>
        Start
      </Link>
    </div>
  );
};

export default Start;