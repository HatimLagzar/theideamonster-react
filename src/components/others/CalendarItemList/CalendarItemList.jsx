import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faEdit, faEllipsisVertical, faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import styles from './calendar-item-list.module.css'
import {useState} from "react";
import {deleteItemFromCalendar} from "../../../api/calendar-api";
import toastr from "toastr";
import {Link} from "react-router-dom";

function CalendarItemList({item, setCalendar, calendar}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleDeleteItemFromCalendar() {
    setIsLoading(true);

    deleteItemFromCalendar(item.id)
      .then((response) => {
        setIsLoading(false);
        toastr.success(response.data.message);
        setCalendar([...calendar.filter(calendarItem => calendarItem.id !== item.id)])
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error)
      })
  }

  return <div className={'flex justify-between mb-4'}>
    <div className={'flex flex-col justify-between w-[15%] py-2'}>
      <span className={'text-xs text-gray-500'}>{item.starts_at ? moment(item.starts_at).format('HH:mm A') : ''}</span>
      <span className={'text-xs text-gray-500'}>{item.ends_at ? moment(item.ends_at).format('HH:mm A') : ''}</span>
    </div>
    <div
      className={styles.leftBand + ' rounded-l-2xl bg-white rounded-r-lg shadow-sm h-full px-5 pl-8 py-3 flex flex-col w-[83%]'}>
      <header className={'flex justify-between relative'}>
        <h6
          className={'text-xs px-4 py-1 rounded-full bg-indigo-100 text-main font-semibold'}>{item.basket ? item.basket.name : 'Basket'}</h6>
        <button className="px-1" onClick={() => setShowDropdown(!showDropdown)}>
          <FontAwesomeIcon icon={faEllipsisVertical}/>
        </button>
        <ul
          className={'rounded shadow border bg-white py-1 flex absolute -right-2 top-6 flex-col ' + (showDropdown ? 'block' : 'hidden')}>
          <li className={'text-sm'}>
            <Link to={'/calendar/' + item.id} className={'px-4 p-1 block'}>
              <FontAwesomeIcon icon={faEdit} size={'sm'}/> Edit
            </Link>
          </li>
          <li className={'text-sm'}>
            <button onClick={handleDeleteItemFromCalendar} className={'px-4 p-1'} disabled={isLoading}>
              {
                !isLoading
                  ? <><FontAwesomeIcon icon={faTrash} size={'sm'}/> Delete</>
                  : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'}/>
              }
            </button>
          </li>
        </ul>
      </header>
      <section className="calendar-item-list-body">
        <p className={'text-center'}>{item.task ? item.task.content : 'All Ideas'}</p>
        {
          item.starts_at || item.ends_at
            ? <small className={'text-gray-500 text-center mx-auto block'}>
              <FontAwesomeIcon icon={faClock} className={'mr-1'}/>
              {item.starts_at ? moment(item.starts_at).format('HH:mm A') : 'Not specified'} - {item.ends_at ? moment(item.ends_at).format('HH:mm A') : 'Not specified'}
            </small>
            : ''
        }
      </section>
    </div>
  </div>
}

export default CalendarItemList;