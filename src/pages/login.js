import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Layout from '../components/shared/Layout/Layout';
import WrapperWithBorder from '../components/shared/WrapperWithBorder/WrapperWithBorder';
import {
  faEnvelope,
  faLock,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../components/shared/InputGroup/InputGroup';
import {useEffect, useState} from 'react';
import authService from '../services/auth/AuthService';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    authService
      .login(email, password)
      .then(() => {
        setIsLoading(false);
        authService.restoreLogin(dispatch);

        const user = authService.getUser();
        if (user) {
          navigate('/');
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (
      authService.hasBeenAuthenticated() &&
      authService.isExpired() === false
    ) {
      navigate('/');
    }
  });

  return (
    <Layout>
      <img
        className={'mx-auto block lg:w-1/5 w-1/3 mt-8'}
        src='/images/logo-holding-basket-login.png'
        alt='Logo'
      />
      <div className='lg:w-1/2 mx-auto'>
        <WrapperWithBorder>
          <h1 className='text-2xl text-black'>
            Sign In{' '}
            <small className='text-xs float-right mt-2'>
              {'Don\'t have an account? '}
              <Link to={'/register'} className={'text-black underline font-bold'}>
                Register
              </Link>{' '}
              here for free!
            </small>
          </h1>
          <hr className='bg-gray-500 my-5'/>
          <form onSubmit={handleSubmit}>
            <InputGroup
              type={'email'}
              icon={faEnvelope}
              color={'#5a62cf'}
              placeholder={'Email Address'}
              onChangeHandler={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <InputGroup
              type={'password'}
              icon={faLock}
              color={'#5a62cf'}
              placeholder={'Password'}
              onChangeHandler={(e) => setPassword(e.currentTarget.value)}
              required
            />

            <button className='py-2 w-full bg-main mt-3' type='submit'>
              {!isLoading ? (
                'Sign In'
              ) : (
                <FontAwesomeIcon icon={faSpinner} className='fa-spin'/>
              )}
            </button>

            <Link to={'/recover'} className='block mx-auto text-center text-xs underline mt-3'>
              Recover your account
            </Link>
          </form>
        </WrapperWithBorder>
      </div>
    </Layout>
  );
};

export default Login;