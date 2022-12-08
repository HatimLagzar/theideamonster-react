import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose, faPlus, faSpinner, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {createCategory} from "../../../api/categories-api";
import toastr from "toastr";
import {setBaskets} from "../../../store/features/tasks/basketsSlice";
import {useDispatch, useSelector} from "react-redux";
import FloatingWrapper from "../../shared/FloatingWrapper/FloatingWrapper";
import useAuthenticationStatus from "../../../hooks/auth/useAuthenticationStatus";
import {Link} from "react-router-dom";

export default function CreateBasketForm({show = false, setShowCreateBasketForm}) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const baskets = useSelector(state => state.baskets.baskets)
  const isLoggedIn = useAuthenticationStatus();

  function handleSubmit(e) {
    e.preventDefault()

    setIsLoading(true)

    createCategory(name)
      .then(response => {
        dispatch(setBaskets([...baskets, {...response.data.category, tasks: []}]))
        setShowCreateBasketForm(false);
        setIsLoading(false)
        setName('')
        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsLoading(false)

        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <>
    {
      show
        ? <FloatingWrapper>
          <button className={'absolute top-1 right-2 text-sm'} onClick={() => setShowCreateBasketForm(false)}>
            <FontAwesomeIcon icon={faClose}/></button>
          <h3 className={'text-2xl text-white text-center mb-3'}>
            New Basket
          </h3>
          <hr className={'bg-white'}/>
          <form onSubmit={handleSubmit}>
            <input
              className='bg-transparent text-gray-100 mb-3 text-xl w-full mt-3 text-center focus-visible:outline-0'
              placeholder='Type basket name'
              type={'text'}
              value={name}
              onChange={e => setName(e.currentTarget.value)}
              required={true}
            />
            <hr className={'bg-white'}/>
            {
              isLoggedIn
                ? <button className='block mt-3 py-2 px-10 mx-auto focus-visible:outline-0 shadow-xl rounded-xl'
                          disabled={isLoading}>
                  {!isLoading
                    ? <>
                      <FontAwesomeIcon icon={faPlus}/> Add Basket
                    </>
                    : <FontAwesomeIcon icon={faSpinner} spin={true}/>}
                </button>
                : <Link to={'/register'}
                        className='block w-full lg:w-1/2 hover:bg-indigo-500 text-center mt-3 py-2 px-10 mx-auto focus-visible:outline-0 shadow-xl rounded-xl'>
                  <FontAwesomeIcon icon={faUserPlus}/> Click here to Create an Account
                </Link>
            }
          </form>
        </FloatingWrapper>
        : ''
    }
  </>;
};
