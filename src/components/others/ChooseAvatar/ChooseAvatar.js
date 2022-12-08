import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faClose, faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function ChooseAvatar(
  {
    setShowCreateDelegableForm,
    selectedAvatar,
    setAvatar,
    handleFinish,
    isLoading
  }
) {
  let avatars = [];

  for (let i = 1; i <= 20; i++) {
    avatars.push(<img src={`/images/avatars/${i}.png`} alt={'Avatar'}/>)
  }

  return (
    <div>
      <button className={'absolute top-1 right-2 text-sm'} onClick={() => setShowCreateDelegableForm(false)}>
        <FontAwesomeIcon icon={faClose}/>
      </button>
      <h3 className={'text-2xl text-white text-center mb-3'}>
        Choose an Avatar
      </h3>

      <div className={'flex justify-between flex-wrap avatars-list'}>
        {
          avatars.map((avatar, index) => {
            return <>
              <input name={'avatar'}
                     id={index + '-avatar'}
                     type="radio"
                     className={'hidden'}
                     onChange={e => setAvatar(index + 1)}
                     defaultChecked={parseInt(selectedAvatar) === index + 1}/>

              <label key={index + '-avatar'}
                     htmlFor={index + '-avatar'}
                     className={'w-[10%] px-2 my-2 flex justify-center items-center'}>
                {avatar}
              </label>
            </>
          })
        }
      </div>

      <button
        key={'delegable-basket-next'}
        className={'block ml-auto leading-none font-semibold font-montserrat mt-3'}
        onClick={() => {
          handleFinish()
        }}
      >
        Finish {
        !isLoading
          ? <FontAwesomeIcon icon={faCheck} size={'1x'}/>
          : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'} size={'1x'}/>
      }
      </button>
    </div>
  );
};
