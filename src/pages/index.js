import {useEffect, useState} from 'react';
import toastr from 'toastr';
import {getUserCategories} from '../api/categories-api';
import BasketDisplay from '../components/others/BasketDisplay/BasketDisplay';
import CreateBasket from '../components/others/CreateBasket/CreateBasket';
import CreateBasketForm from '../components/others/CreateBasketForm/CreateBasketForm';
import Layout from './../components/shared/Layout/Layout';
import styles from './../styles/pages/index.module.css';
import BasketTodos from '../components/others/BasketTodos/BasketTodos';
import {useDispatch, useSelector} from 'react-redux';
import {setBaskets, setSelectedBasket,} from '../store/features/tasks/basketsSlice';
import WriteNewIdeaForm from '../components/others/WriteNewIdeaForm/WriteNewIdeaForm';
import SpeechBubble from '../components/others/SpeechBubble/SpeechBubble';
import RecordNewIdeaForm from "../components/others/RecordNewIdeaForm/RecordNewIdeaForm";
import useAuthenticationStatus from "../hooks/auth/useAuthenticationStatus";
import {useNavigate} from "react-router-dom";

function Index() {
  const [showCreateBasketForm, setShowCreateBasketForm] = useState(false);
  const dispatch = useDispatch();
  const baskets = useSelector((state) => state.baskets.baskets);
  const selectedBasket = useSelector((state) => state.baskets.selectedBasket);
  const showWriteNewIdeaForm = useSelector((state) => state.baskets.showWriteNewIdeaForm);
  const showRecordNewIdeaForm = useSelector((state) => state.baskets.showRecordNewIdeaForm);
  const isLoggedIn = useAuthenticationStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (baskets === null && isLoggedIn) {
      getUserCategories()
        .then((response) => {
          dispatch(setBaskets(response.data.categories));
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        });
    }
  });

  // if (!isLoggedIn) {
  //   navigate('/login')
  // }

  function selectBasketHandler(basket) {
    dispatch(setSelectedBasket(basket));
  }

  return (
    <Layout>
      <h1
        className={styles.title + ' text-black text-center text-2xl px-20 mt-7'}
      >
        Think about the results you want to see
      </h1>

      <img
        className={'block mx-auto mt-5'}
        src='/images/baskets-monster.png'
        alt='Monster Writing'
        width={125}
        height={125}
      />

      <div className='flex flex-row justify-between mt-6 flex-wrap w-full'>
        {
          isLoggedIn
            ?
            baskets instanceof Array
              ? baskets.length > 0
                ? baskets.map((basket, index) => {
                  return (
                    <BasketDisplay
                      key={index + '-basket'}
                      selectBasketHandler={() => selectBasketHandler(basket)}
                      basket={basket}
                    />
                  );
                })
                : ''
              : 'Loading Baskets...'
            : ''
        }
        <CreateBasket setShowCreateBasketForm={setShowCreateBasketForm}/>
        <CreateBasketForm
          show={showCreateBasketForm}
          setShowCreateBasketForm={setShowCreateBasketForm}
        />
      </div>

      {(baskets instanceof Array && baskets.length === 0) || !isLoggedIn ? (
        <>
          <SpeechBubble
            text={'Click on "Create Basket" to create your first goals.'}
            style={{right: '0', left: 'auto'}}
          />
          <SpeechBubble
            text={
              "It's just the beginning of a great journey, you can do this!"
            }
            style={{top: '75%', right: '0', left: 'auto'}}
            disableImage
          />
        </>
      ) : (
        ''
      )}

      {selectedBasket ? <BasketTodos basket={selectedBasket}/> : ''}

      {showWriteNewIdeaForm ? <WriteNewIdeaForm/> : ''}

      {showRecordNewIdeaForm ? <RecordNewIdeaForm/> : ''}
    </Layout>
  );
};


export default Index;