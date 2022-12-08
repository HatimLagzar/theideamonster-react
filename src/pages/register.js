import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Layout from '../components/shared/Layout/Layout';
import WrapperWithBorder from '../components/shared/WrapperWithBorder/WrapperWithBorder';
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../components/shared/InputGroup/InputGroup';
import {login, register} from '../api/login-api';
import {useState} from 'react';
import toastr from 'toastr';
import {Link, useNavigate} from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.set('first_name', firstName);
    formData.set('last_name', lastName);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('password_confirmation', passwordConfirmation);

    register(formData)
      .then((response) => {
        toastr.success(response.data.message);
        navigate('/login');
      })
      .catch((error) => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      });
  }

  return (
    <Layout>
      <WrapperWithBorder>
        <h1 className='text-2xl'>Sign up. It is fast and easy.</h1>
        <hr className='bg-gray-500 my-5'/>
        <form onSubmit={handleSubmit}>
          <InputGroup
            type={'text'}
            icon={faUser}
            color={'#5a62cf'}
            placeholder={'First Name'}
            onChangeHandler={(e) => setFirstName(e.currentTarget.value)}
            required
          />
          <InputGroup
            type={'text'}
            icon={faUser}
            color={'#5a62cf'}
            placeholder={'Last Name'}
            onChangeHandler={(e) => setLastName(e.currentTarget.value)}
            required
          />
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
          <InputGroup
            type={'password'}
            icon={faLock}
            color={'#5a62cf'}
            placeholder={'Password Confirmation'}
            onChangeHandler={(e) =>
              setPasswordConfirmation(e.currentTarget.value)
            }
            required
          />

          <label className='block text-sm mt-5 mb-2 leading-none'>
            <input className='checkbox mr-1' type={'checkbox'} required/> I
            read and accept <a className='underline'>Terms & Conditions</a>.
          </label>

          <label className='block text-sm leading-none'>
            <input className='checkbox mr-1' type={'checkbox'}/> Send me the
            Newsletter weekly.
          </label>

          <button className='py-2 w-full bg-main mt-5' type='submit'>
            Sign up now.
          </button>
          <div className='block'>
            <div></div>
            <Link to={'/login'} className='py-2 w-1/3 bg-gray-700 block mt-2 ml-auto text-center text-white'>
              Or Sign In
            </Link>
          </div>
        </form>
      </WrapperWithBorder>
    </Layout>
  );
};

export default Register;