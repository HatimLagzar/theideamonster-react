import styles from './CalendarTaskItem.module.css'
import AudioWave from "../../shared/AudioWave/AudioWave";
import {STRING_TYPE} from "../../../utils/constants/task";

function CalendarTaskItem({task, setSelectedTask, width = '48%', checked = false}) {
  return <div className={styles.wrapper} style={{width: width}}>
    <input
      name={'selected_tasks'}
      type="radio"
      className={'hidden'}
      id={task.id}
      value={task.id}
      onChange={e => setSelectedTask(e.currentTarget.value)}
      defaultChecked={checked}
    />
    <label className={styles.label} htmlFor={task.id}>
      {
        task.type === STRING_TYPE
          ? task.content
          : <AudioWave id={task.id} url={task.content} waveColor={'#5a62cf'} interact={false}/>
      }
    </label>
  </div>
}

export default CalendarTaskItem;