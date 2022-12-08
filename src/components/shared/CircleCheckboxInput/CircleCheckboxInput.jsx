import styles from './circle-checkbox-input.module.css'

export default function CircleCheckboxInput({id, checked, handleChange}) {
  return <>
    <label className={styles.label} htmlFor={id}>
      {
        checked
          ? <img src={'/images/checkbox-icon-circle.png'} alt={'checked'} width={20}/>
          : <img src={'/images/checkbox-icon-circle-unchecked.png'} alt={'not checked'} width={20}/>
      }
    </label>

    <input id={id}
           className={'hidden'}
           type="checkbox"
           defaultChecked={checked}
           onChange={(e) => handleChange()}
    />
  </>
}