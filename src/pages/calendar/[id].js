import Layout from "../../components/shared/Layout/Layout";
import {useEffect, useState} from "react";
import {getUserCategories} from "../../api/categories-api";
import CalendarTaskItem from "../../components/others/CalendarTaskItem/CalendarTaskItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faPaperPlane, faSpinner} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import InlineWeekDaysCalendar from "../../components/others/InlineWeekDaysCalendar/InlineWeekDaysCalendar";
import {getItemById, updateInCalendar} from "../../api/calendar-api";
import toastr from "toastr";
import {STRING_TYPE} from "../../utils/constants/task";
import {Link, useNavigate, useParams} from "react-router-dom";
import useAuthenticationStatus from "../../hooks/auth/useAuthenticationStatus";

function CalendarEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [baskets, setBaskets] = useState(null);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStartingDate, setSelectedStartingDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const navigate = useNavigate()
  const {id} = useParams()
  const isLoggedIn = useAuthenticationStatus();

  useEffect(() => {
    if (item === null && baskets && isLoggedIn) {
      getItemById(id)
        .then(response => {
          setItem(response.data.item);
          setSelectedStartingDate(moment(response.data.item.starts_at).startOf('day'))
          setSelectedEndDate(moment(response.data.item.ends_at).startOf('day'))
          setSelectedBasket(baskets.find(basket => basket.id === response.data.item.basket_id));
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [id, baskets, item])

  useEffect(() => {
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

    updateInCalendar(
      id,
      selectedBasket.id,
      selectedTask,
      selectedStartingDate.format('YYYY-MM-DD HH:mm:ss'),
      selectedEndDate.format('YYYY-MM-DD HH:mm:ss')
    )
      .then(response => {
        setIsLoading(false);
        toastr.success(response.data.message);
        navigate('/calendar')
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  if (baskets === null || item === null) {
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
          defaultValue={item.basket_id}
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
                                  checked={item.task_id === null}/>
                {
                  selectedBasket.tasks.map(task => {
                    return <CalendarTaskItem setSelectedTask={setSelectedTask} task={task} key={task.id}
                                             checked={item.task_id === task.id}/>
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
                  ? <><FontAwesomeIcon className={'mr-2'} icon={faPaperPlane}/>Update Calendar</>
                  : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'}/>
              }
            </button>
          </>
      }
    </form>
  </Layout>
}

export default CalendarEdit;