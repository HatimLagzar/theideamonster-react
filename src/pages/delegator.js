import Layout from "../components/shared/Layout/Layout";
import {useEffect, useState} from "react";
import {getUserDelegables} from "../api/delegables-api";
import DelegableBasketDisplay from "../components/others/DelegableBasketDisplay/DelegableBasketDisplay";
import CreateDelegable from "../components/others/CreateDelegable/CreateDelegable";
import CreateDelegableForm from "../components/others/CreateDelegableForm/CreateDelegableForm";
import ShowDelegable from "../components/others/ShowDelegable/ShowDelegable";
import DelegatedProfileForm from "../components/others/DelegatedProfileForm/DelegatedProfileForm";
import toastr from "toastr";
import useAuthenticationStatus from "../hooks/auth/useAuthenticationStatus";
import {useNavigate} from "react-router-dom";

function Delegator() {
  const [delegables, setDelegables] = useState(null);
  const [showCreateDelegableForm, setShowCreateDelegableForm] = useState(false);
  const [showDelegatedProfileForm, setShowDelegatedProfileForm] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const isLoggedIn = useAuthenticationStatus();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Help Tracker | The Idea Monster'
  })

  useEffect(() => {
    if (delegables === null && isLoggedIn) {
      getUserDelegables()
        .then(response => {
          setDelegables(response.data.delegables);
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
    }
  }, [delegables])

  if (!isLoggedIn) {
    navigate('/login')
  }

  return <Layout>
    <h1 className={'text-3xl text-black text-center leading-none mt-7 flex justify-center'}>
      Help Tracker{' '}
      <small
        className={'flex justify-center items-center text-xs text-red-500 border border-red-600 ml-2 w-7 h-7 rounded-full'}>
        <span className={'font-montserrat font-bold leading-none'}>Pro</span>
      </small>
    </h1>

    <h2 className={'text-2xl font-medium text-center mt-4'}>How can you delegate ?</h2>
    <p className={'text-xl font-medium text-center text-main mt-2'}>Tasks that can be done<br/>by someone else:</p>

    <div className='flex flex-row justify-between mt-6 flex-wrap w-full'>
      {delegables instanceof Array
        ? delegables.length > 0
          ? delegables.map((delegable, index) => {
            return (
              <DelegableBasketDisplay key={index + '-delegable'}
                                      selectBasketHandler={() => setSelectedBasket(delegable)}
                                      delegable={delegable}/>
            );
          })
          : ''
        : 'Loading Delegables...'}

      <CreateDelegable setShowCreateDelegableForm={setShowCreateDelegableForm}/>
      <CreateDelegableForm
        delegables={delegables}
        setDelegables={setDelegables}
        show={showCreateDelegableForm}
        setShowCreateDelegableForm={setShowCreateDelegableForm}
      />
    </div>

    {
      selectedBasket && !selectedProfile
        ? <ShowDelegable
          setSelectedBasket={setSelectedBasket}
          delegables={delegables}
          setDelegables={setDelegables}
          delegable={selectedBasket}
          setSelectedProfile={setSelectedProfile}
        />
        : ''
    }

    {
      selectedProfile
        ? <DelegatedProfileForm
          setSelectedProfile={setSelectedProfile}
          delegable={selectedBasket}
          profile={selectedProfile}
          delegables={delegables}
          setDelegables={setDelegables}
        />
        : ''
    }
  </Layout>
}

export default Delegator;