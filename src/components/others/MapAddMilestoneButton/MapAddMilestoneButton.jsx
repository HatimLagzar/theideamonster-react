import styles from './map-add-milestone-button.module.css'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MapAddMilestoneButton({ onClick }) {
  return <button className={styles.button + ' sm:right-36 right-[5%]'} onClick={() => onClick()}>
    <img className={'mx-auto'} src='/images/logo-holding-basket.png' alt={'monster holding basket'} width={65} />
    <p className={styles.title + ' rounded-full'}>Add Milestone</p>
    <FontAwesomeIcon
      className={styles.icon}
      icon={faPlusCircle}
      color={'#5a62cf'}
    />
  </button>
}

export default MapAddMilestoneButton;