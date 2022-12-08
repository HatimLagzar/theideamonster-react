import {faArrowRightLong, faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CHOOSE_AVATAR} from "../../../utils/constants/delegator";

export default function DelegatedTasksInfoForm(
  {
    job,
    setJob,
    mission,
    setMission,
    setStep,
    setShowCreateDelegableForm
  }
) {
  return (
    <div>
      <button className={'absolute top-1 right-2 text-sm'} onClick={() => setShowCreateDelegableForm(false)}>
        <FontAwesomeIcon icon={faClose}/></button>
      <h3 className={'text-2xl text-white text-center mb-3'}>
        Delegate a Task
      </h3>
      <hr className={'bg-white'}/>
      <input
        className='bg-transparent text-gray-100 my-2 text-base w-full text-center focus-visible:outline-0'
        placeholder="Type person's job"
        type={'text'}
        value={job}
        onChange={e => setJob(e.currentTarget.value)}
        required={true}
      />
      <hr className={'bg-white'}/>
      <p className={'text-center text-white text-sm my-1'}>And</p>
      <hr className={'bg-white'}/>
      <input
        className='bg-transparent text-gray-100 my-2 text-base w-full text-center focus-visible:outline-0'
        placeholder='Their mission'
        type={'text'}
        value={mission}
        onChange={e => setMission(e.currentTarget.value)}
        required={true}
      />
      <hr className={'bg-white'}/>
      <button
        key={'delegable-basket-next'}
        className={'block ml-auto leading-none font-semibold font-montserrat mt-3'}
        onClick={() => setStep(CHOOSE_AVATAR)}
      >
        Next <FontAwesomeIcon icon={faArrowRightLong} size={'1x'}/>
      </button>
    </div>
  );
};
