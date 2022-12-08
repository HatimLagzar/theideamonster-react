import styles from './inline-week-days-calendar.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import 'daterangepicker/daterangepicker.css'
import 'daterangepicker/daterangepicker'
import $ from 'jquery'
import {useEffect, useState} from "react";

export default function InlineWeekDaysCalendar({startDate, endDate, setSelectedStartingDate, setSelectedEndDate, single = false}) {
  const [sevenDays, setSevenDays] = useState([]);

  useEffect(() => {
    $('input#date-time-range').daterangepicker({
      singleDatePicker: single,
      timePicker: true,
      minDate: !single ? startDate : null,
      startDate: startDate,
      endDate: endDate,
      opens: 'left',
      locale: {
        format: 'M/DD hh:mm A'
      }
    })
      .on('apply.daterangepicker', function(ev, picker) {
        setSelectedStartingDate(picker.startDate);
        setSelectedEndDate(picker.endDate);
      });
  });

  useEffect(() => {
    drawDays();
  }, [startDate, endDate])


  if (!startDate || !endDate) {
    return '';
  }

  function drawDays() {
    let currentDate = moment(startDate.format('YYYY-MM-DD')).startOf('isoWeek');
    let days = [];

    for (let i = 1; i <= 7; i++) {
      if (currentDate.unix() >= startDate.startOf('day').unix() && currentDate.unix() <= endDate.startOf('day').unix()) {
        days.push(
          <li key={currentDate.unix() + '-li'} className={'text-center bg-main text-white p-2 rounded-lg shadow'}>
            <span className={'block text-sm'}>{currentDate.format('ddd')}</span>{currentDate.format('DD')}
          </li>
        )
      } else {
        days.push(
          <li key={currentDate.unix() + '-li'} className={'text-center p-2 rounded-lg'}>
            <span className={'block text-sm'}>{currentDate.format('ddd')}</span>{currentDate.format('DD')}
          </li>
        )
      }

      currentDate = currentDate.add(1, 'day');
    }

    setSevenDays(days);
  }

  return <div className={styles.wrapper + ' mb-5 rounded'}>
    <div className={styles.selectedDateInfo}>
      <div className={styles.text}>
        <p className={'leading-none'}>June 24, 2022</p>
        <small className={'text-gray-600 leading-none'}>10 Tasks Today</small>
      </div>
      <label className={'px-2 py-1 rounded border border-gray-200 shadow-sm'}>
        <FontAwesomeIcon icon={faCalendar} className={'text-main'}/>
        <input type="text" id={'date-time-range'} className={'h-0 w-0 invisible'}/>
      </label>
    </div>
    <div className={styles.weekDays}>
      <ul className={'flex justify-between'}>
        {
          sevenDays.map(day => day)
        }
      </ul>
    </div>
  </div>
}