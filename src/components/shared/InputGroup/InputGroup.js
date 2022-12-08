import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './InputGroup.module.css';

export default function InputGroup(
  {
    id,
    icon = null,
    color,
    type,
    placeholder,
    onChangeHandler,
    required = false,
    rounded = false,
    hasBorder = true,
    defaultValue
  }
) {
  return (
    <div className={styles.group + ' mb-2 w-full'}>
      {
        icon && <FontAwesomeIcon className={styles.icon} icon={icon} color={color}/>
      }
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={styles.input + (icon ? ' text-sm px-10 py-2 w-full ' : ' text-sm px-4 py-2 border w-full ') + (rounded ? 'rounded-sm' : '') + (hasBorder ? ' border' : ' border-0')}
        onChange={onChangeHandler}
        required={required}
        defaultValue={defaultValue || ''}
      />
    </div>
  );
}
