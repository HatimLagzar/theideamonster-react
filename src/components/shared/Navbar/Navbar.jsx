import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBrain,
  faCalendar,
  faCrown,
  faHome,
  faMap,
  faPeopleGroup,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className={
        'bg-white w-full lg:w-1/4 lg:h-screen lg:static fixed bottom-0 shadow-2xl'
      }
      style={{zIndex: 9}}
    >
      <img
        className={'mx-auto lg:w-1/2 mt-8 hidden lg:block'}
        src='/images/logo-holding-basket-login.png'
        alt='Logo'
      />
      <ul className={'m-0 flex justify-between lg:block py-2 lg:py-0 lg:mt-8'}>
        <li className={'hidden lg:inline-block w-full px-6 mb-3'}>
          <button
            className={
              'shadow bg-main text-white rounded-full py-2 px-6 mx-auto w-full'
            }
          >
            <FontAwesomeIcon icon={faPlus}/>
            <span className='hidden lg:inline-block ml-2 uppercase'>
              Add Task
            </span>
          </button>
        </li>
        <li className={'py-3 px-5 lg:hover:bg-gray-100'}>
          <Link to={'/'} className={document.location.pathname === '/' ? 'text-main' : ''}>
            <FontAwesomeIcon size={'1x'} icon={faHome}/>
            <span className='hidden lg:inline-block ml-2 uppercase'>
                Home
              </span>
          </Link>
        </li>
        <li className={'py-3 px-5 lg:hover:bg-gray-100'}>
          <Link to={'/subscribe'}>
            <FontAwesomeIcon size={'1x'} icon={faCrown}/>
            <span className='hidden lg:inline-block ml-2 uppercase'>
                Subscribe
              </span>
          </Link>
        </li>
        <li className={'py-3 px-5 lg:hover:bg-gray-100'}>
          <Link to={'/calendar'}>
            <FontAwesomeIcon size={'1x'} icon={faCalendar}/>
            <span className='hidden lg:inline-block ml-2 uppercase'>
                Calendar
              </span>
          </Link>
        </li>
        <li className={'inline-block lg:hidden'}>
          <button
            className={'w-14 h-14 block rounded-full border shadow text-main'}
          >
            <FontAwesomeIcon icon={faPlus} size={'2x'}/>
          </button>
        </li>
        <li className={'py-3 px-5 lg:hover:bg-gray-100'}>
          <Link to={'/delegator'}>
            <FontAwesomeIcon size={'1x'} icon={faPeopleGroup}/>
            <span className='hidden lg:inline-block ml-2 uppercase'>
                Help Tracker
              </span>
          </Link>
        </li>
        <li className={'py-3 px-5 lg:hover:bg-gray-100'}>
          <Link to={'/map'}>
              <FontAwesomeIcon size={'1x'} icon={faMap}/>
              <span className='hidden lg:inline-block ml-2 uppercase'>Map</span>
          </Link>
        </li>
        <li className={'py-3 px-5 lg:hover:bg-gray-100'}>
          <Link to={'/meditation'}>
              <FontAwesomeIcon size={'1x'} icon={faBrain}/>
              <span className='hidden lg:inline-block ml-2 uppercase'>
                Meditation Space
              </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
