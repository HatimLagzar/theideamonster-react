import Layout from "../../components/shared/Layout/Layout";
import InlineWeekDaysCalendar from "../../components/others/InlineWeekDaysCalendar/InlineWeekDaysCalendar";
import {useEffect, useState} from "react";
import moment from "moment";
import toastr from "toastr";
import {getAllInCalendar} from "../../api/calendar-api";
import CalendarItemList from "../../components/others/CalendarItemList/CalendarItemList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import useAuthenticationStatus from "../../hooks/auth/useAuthenticationStatus";

function CalendarIndex() {
  const [uncategorizedCalendar, setUncategorizedCalendar] = useState(null)
  const [calendar, setCalendar] = useState(null)
  const [selectedStartingDate, setSelectedStartingDate] = useState(moment().startOf('day'))
  const isLoggedIn = useAuthenticationStatus();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#f9f9f9';
    document.body.querySelectorAll('.top-left-bg, .bottom-right-bg')
      .forEach(item => item.style.display = 'none')
  }, [])

  useEffect(() => {
    getAllInCalendar(selectedStartingDate.format('YYYY-MM-DD'))
      .then(response => {
        setCalendar(response.data.calendar);
        setUncategorizedCalendar(response.data.uncategorizedCalendar);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        if (error.response.status === 401 && isLoggedIn) {
          navigate('/subscribe')
        }

        console.log(error);
      })
  }, [selectedStartingDate])

  if (!isLoggedIn) {
    navigate('/login')
  }

  return <Layout>
    <div className="mx-5 mt-5">
      <Link to={'/calendar/create'}
            className={'bg-main text-white text-center py-1 px-10 mb-2 text-center rounded block'}>
        <FontAwesomeIcon className={'mr-2'} icon={faCalendarPlus}/> New
      </Link>
      <InlineWeekDaysCalendar
        startDate={selectedStartingDate}
        endDate={selectedStartingDate}
        setSelectedEndDate={setSelectedStartingDate}
        setSelectedStartingDate={setSelectedStartingDate}
        single
      />

      {
        !uncategorizedCalendar
          ? 'Loading...'
          : uncategorizedCalendar.map(item => <CalendarItemList calendar={uncategorizedCalendar}
                                                                setCalendar={setUncategorizedCalendar}
                                                                key={item.id + '-calendar-item-list'} item={item}/>)
      }

      <hr className={'bg-main mb-4 border-none h-[1px] w-[90%] mx-auto'}/>

      {
        !calendar
          ? 'Loading...'
          : calendar.map(item => <CalendarItemList calendar={calendar} setCalendar={setCalendar}
                                                   key={item.id + '-calendar-item-list'} item={item}/>)
      }
    </div>
  </Layout>
}

export default CalendarIndex;