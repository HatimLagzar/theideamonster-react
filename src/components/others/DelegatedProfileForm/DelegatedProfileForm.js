import {faClose, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from "react";
import ChooseAvatar from "../ChooseAvatar/ChooseAvatar";
import {updateDelegable} from "../../../api/delegables-api";
import {updateProfile} from "../../../api/profiles-api";
import toastr from "toastr";
import FloatingWrapper from "../../shared/FloatingWrapper/FloatingWrapper";

export default function DelegatedProfileForm(
  {
    profile,
    setSelectedProfile,
    delegable,
    delegables,
    setDelegables,
  }
) {
  const [isLoading, setIsLoading] = useState(0);
  const [showChooseAvatar, setShowChooseAvatar] = useState(false);
  const [name, setName] = useState(profile.name || '');
  const [job, setJob] = useState(profile.job || '');
  const [avatar, setAvatar] = useState(profile.avatar || '1');
  const [mission, setMission] = useState(delegable.name || '');

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(2);

    updateDelegable(delegable.id, mission)
      .then(response => {
        setIsLoading(isLoading);
        setDelegables([
          ...delegables.map(item => {
            item.name = mission;
            return item;
          })
        ])

        toastr.success('Mission updated successfully.');
      })
      .catch(error => {
        setIsLoading(Math.max(0, isLoading - 1));
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error)
      })

    updateProfile(delegable.profile.id, name, job, avatar)
      .then(response => {
        setIsLoading(isLoading);
        setDelegables([
          ...delegables.map(item => {
            if (item.profile.id === delegable.profile.id) {
              item.profile.name = name;
              item.profile.job = job;
              item.profile.avatar = avatar;
            }

            return item;
          })
        ])

        setSelectedProfile({
          ...delegable,
          profile: {
            ...delegable.profile,
            name,
            job,
            avatar,
          }
        })

        toastr.success('Profile updated successfully.');
      })
      .catch(error => {
        setIsLoading(Math.max(0, isLoading - 1));
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error)
      })
  }

  return <>
    <FloatingWrapper styles={{maxHeight: 500}}>
      <button className={'absolute top-1 right-2 text-sm'} onClick={() => setSelectedProfile(null)}>
        <FontAwesomeIcon icon={faClose}/>
      </button>
      <button className={'absolute -top-3 left-2'} onClick={() => setShowChooseAvatar(true)}>
        <img className={'block mx-auto mb-0'} src={`/images/avatars/${avatar}.png`} alt="Avatar" width={40}/>
        <span className={'text-[10px] block text-center text-gray-200'}>Change Avatar</span>
      </button>
      {
        showChooseAvatar
          ? <ChooseAvatar key={'choose-avatar-profile'} 
                          setShowCreateDelegableForm={() => setShowChooseAvatar(false)}
                          handleFinish={() => {
                            setShowChooseAvatar(false)
                          }}
                          setAvatar={setAvatar}
                          selectedAvatar={avatar}/>
          : ''
      }
      <div className={!showChooseAvatar ? 'block' : 'hidden'}>
        <h3 className={'text-2xl text-white text-center mb-3 mt-5 font-montserrat font-medium'}>
          Profile
        </h3>
        <form onSubmit={handleSubmit} className={'w-3/4 mx-auto'}>
          <label className={'font-montserrat font-bold mb-1 block'} htmlFor="nameInput">Full Name:</label>
          <div className={'mb-3'}>
            <hr className={'bg-white'}/>
            <input
              id={'nameInput'}
              className='bg-transparent text-gray-100 my-1 text-base w-full text-center focus-visible:outline-0'
              placeholder="Type Person Name"
              type={'text'}
              value={name}
              onChange={e => setName(e.currentTarget.value)}
              required={true}
            />
            <hr className={'bg-white'}/>
          </div>
          <div className={'mb-3'}>
            <label className={'font-montserrat font-bold mb-1 block'} htmlFor="jobInput">Job:</label>
            <hr className={'bg-white'}/>
            <input
              id={'jobInput'}
              className='bg-transparent text-gray-100 my-1 text-base w-full text-center focus-visible:outline-0'
              placeholder="Type person's job"
              type={'text'}
              value={job}
              onChange={e => setJob(e.currentTarget.value)}
              required={true}
            />
            <hr className={'bg-white'}/>
          </div>
          <div className={'mb-3'}>
            <label className={'font-montserrat font-bold mb-1 block'} htmlFor="missionInput">Mission:</label>
            <hr className={'bg-white'}/>
            <input
              id={'missionInput'}
              className='bg-transparent text-gray-100 my-1 text-base w-full text-center focus-visible:outline-0'
              placeholder="Type person's mission"
              type={'text'}
              value={mission}
              onChange={e => setMission(e.currentTarget.value)}
              required={true}
            />
            <hr className={'bg-white'}/>
          </div>
          <button
            key={'delegable-basket-next'}
            className={'block ml-auto leading-none font-semibold font-montserrat mt-4'}
          >
            {
              isLoading < 1
                ? "Update"
                : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'}/>
            }
          </button>
        </form>
      </div>
    </FloatingWrapper>
  </>;
};
