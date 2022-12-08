import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import styles from "./ShowMilestoneDetails.module.css";

function ShowMilestoneDetails({milestone, setShowEditMilestoneForm}) {
  return <>
    <div className={'absolute top-[40%] sm:top-[46%] right-10 sm:right-40 w-[25%] sm:w-[10%] font-montserrat font-bold'}>
      <CircularProgressbar className={''}
                           value={milestone.percentage}
                           text={`${milestone.percentage}%`}
                           strokeWidth={7}
                           styles={buildStyles({
                             backgroundColor: '#3e98c7',
                             textColor: '#fff',
                             trailColor: '#fff',
                             textSize: '24px'
                           })}/>
      {
        milestone.percentage >= 100
          ? <img className={'relative -top-8'} src={'/images/medal.png'} alt={'Medal'} width={55} />
          : ''
      }
    </div>

    <div className="details absolute sm:left-40 top-[40%] sm:top-[46%] left-8 flex flex-col items-center">
      <p className={styles.title + ' rounded-full text-white mb-0'}>
        {milestone.basket.name}
      </p>
      <div
        className={'w-8 h-8 mt-2 font-montserrat font-bold border border-white rounded-full bg-sky-500 text-white flex justify-center items-center text-center'}>
        <span>{milestone.difference}</span>
      </div>
      <p>Days Remaining</p>
      <button className={'text-gray-200 text-sm'} onClick={() => setShowEditMilestoneForm(true)}>(edit)</button>
    </div>
  </>
}

export default ShowMilestoneDetails;