import Layout from "../../components/shared/Layout/Layout";
import {useEffect, useState} from "react";
import {getUserCategories} from "../../api/categories-api";
import CalendarTaskItem from "../../components/others/CalendarTaskItem/CalendarTaskItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCalendarPlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import InlineWeekDaysCalendar from "../../components/others/InlineWeekDaysCalendar/InlineWeekDaysCalendar";
import {storeInCalendar} from "../../api/calendar-api";
import toastr from "toastr";
import {STRING_TYPE} from "../../utils/constants/task";
import {Link, useNavigate} from "react-router-dom";
import useAuthenticationStatus from "../../hooks/auth/useAuthenticationStatus";

function CalendarCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [baskets, setBaskets] = useState(null);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStartingDate, setSelectedStartingDate] = useState(moment().startOf('day'))
  const [selectedEndDate, setSelectedEndDate] = useState(moment().startOf('day').add(1, 'day'))
  const isLoggedIn = useAuthenticationStatus();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Create Calendar Item | The Idea Monster'
    document.body.style.backgroundColor = '#f9f9f9';
    document.body.querySelectorAll('.top-left-bg, .bottom-right-bg')
      .forEach(item => item.style.display = 'none')

    if (baskets === null && isLoggedIn) {
      getUserCategories()
        .then(response => {
          setBaskets(response.data.categories);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [baskets])

  if (!isLoggedIn) {
    navigate('/login')
  }

  function handleStoreInCalendar(e) {
    e.preventDefault();

    setIsLoading(true);

    storeInCalendar(
      selectedBasket.id,
      selectedTask,
      selectedStartingDate.format('YYYY-MM-DD HH:mm:ss'),
      selectedEndDate.format('YYYY-MM-DD HH:mm:ss')
    )
      .then(response => {
        setIsLoading(false);
        toastr.success(response.data.message);
        setSelectedBasket('');
        setSelectedTask(null);
        // setSelectedStartingDate(moment().startOf('day'));
        // setSelectedEndDate(moment().startOf('day').add(1, 'day'));
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          toastr.error(error.response.data.message);
        }

        if (error.response.status === 401 && isLoggedIn) {
          navigate('/subscribe')
        }

        console.log(error);
      })
  }

  if (baskets === null) {
    return 'Loading...';
  }

  return <Layout>
    <form className="flex mx-5 mt-5 flex-col" onSubmit={handleStoreInCalendar}>
      <Link to={'/calendar'} className={'bg-main text-white text-center py-1 px-10 mb-2 text-center rounded block'}>
          <FontAwesomeIcon className={'mr-2'} icon={faArrowLeft}/> Back
      </Link>

      <InlineWeekDaysCalendar
        startDate={selectedStartingDate}
        endDate={selectedEndDate}
        setSelectedEndDate={setSelectedEndDate}
        setSelectedStartingDate={setSelectedStartingDate}
      />

      <div className="input-group mb-5">
        <label htmlFor={'basket'}>Choose a Basket</label>
        <select
          id={'basket'} className={'w-full py-2 px-4 border rounded border-gray-200'}
          onChange={e => setSelectedBasket(baskets.find(item => item.id === e.currentTarget.value) || null)}
          value={selectedBasket ? selectedBasket.id : ''}
        >
          <option value={''}>Select a Basket</option>
          {
            baskets.length > 0
              ? baskets.map(basket => {
                return <option key={basket.id} value={basket.id}>{basket.name}</option>
              })
              : ''
          }
        </select>
      </div>
      {
        !selectedBasket
          ? ''
          : <>
            <div className="input-group mb-5">
              <label>Choose Idea</label>
              <div className={'flex flex-wrap justify-between'}>
                <CalendarTaskItem setSelectedTask={() => setSelectedTask(null)}
                                  task={{content: 'All', id: 'ALL-IDEAS', type: STRING_TYPE}}
                                  key={'ALL-IDEAS'}
                                  checked={true}/>
                {
                  selectedBasket.tasks.map(task => {
                    return <CalendarTaskItem setSelectedTask={setSelectedTask} task={task} key={task.id}/>
                  })
                }
              </div>
            </div>
            <div className="flex justify-between">
              <div className="input-group mb-5 w-[48%]">
                <label htmlFor={'starts-at'}>Starts At</label>
                <input id={'starts-at'}
                       className={'w-full py-2 px-4 border rounded'}
                       type="datetime-local"
                       onChange={e => {
                         setSelectedStartingDate(moment(e.currentTarget.value))
                       }}
                       value={selectedStartingDate.format('YYYY-MM-DDTHH:mm')}/>
              </div>
              <div className="input-group mb-5 w-[48%]">
                <label htmlFor={'ends-at'}>Ends At</label>
                <input id={'ends-at'}
                       className={'w-full py-2 px-4 border rounded'}
                       type="datetime-local"
                       onChange={e => {
                         setSelectedEndDate(moment(e.currentTarget.value))
                       }}
                       value={selectedEndDate.format('YYYY-MM-DDTHH:mm')}/>
              </div>
            </div>

            <button className={'bg-main text-white text-center py-2 px-10 mt-2 text-center rounded disabled:opacity-75'}
                    disabled={isLoading}>
              {
                !isLoading
                  ? <><FontAwesomeIcon className={'mr-2'} icon={faCalendarPlus}/>Add To Calendar</>
                  : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'}/>
              }
            </button>
          </>
      }

    </form>
  </Layout>
}

export default CalendarCreate;