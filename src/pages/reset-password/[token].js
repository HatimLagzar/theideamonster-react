import Layout from "../../components/shared/Layout/Layout";
import WrapperWithBorder from "../../components/shared/WrapperWithBorder/WrapperWithBorder";
import InputGroup from "../../components/shared/InputGroup/InputGroup";
import {faEnvelope, faLock, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {resetPassword} from "../../api/recover-api";
import toastr from "toastr";
import {Link, useNavigate, useParams} from "react-router-dom";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const {token} = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    resetPassword(email, password, passwordConfirmation, token)
      .then(response => {
        setIsLoading(false);
        toastr.success(response.data.message);
        navigate('/login')
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <Layout>
    <WrapperWithBorder>
      <h1 className='text-2xl text-black'>Write your new password</h1>

      <hr className='bg-gray-500 mt-2 mb-7'/>

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
          placeholder={'New Password'}
          onChangeHandler={(e) => setPassword(e.currentTarget.value)}
          required
        />

        <InputGroup
          type={'password'}
          icon={faLock}
          color={'#5a62cf'}
          placeholder={'Password Confirmation'}
          onChangeHandler={(e) => setPasswordConfirmation(e.currentTarget.value)}
          required
        />

        <button className='py-2 w-full bg-main mt-3 disabled:opacity-80' type='submit' disabled={isLoading}>
          {
            !isLoading
              ? 'Set as New Password'
              : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'}/>
          }
        </button>
      </form>
      <Link href={'/recover'}>
        <a className='block mx-auto text-center text-xs underline mt-3'>
          Recover your account
        </a>
      </Link>
      <Link href={'/login'}>
        <a className='block mx-auto text-center text-xs underline mt-3'>
          Login
        </a>
      </Link>
    </WrapperWithBorder>
  </Layout>
}

export default ResetPassword;