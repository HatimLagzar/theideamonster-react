import toastr from "toastr";
import Layout from "../components/shared/Layout/Layout";
import WrapperWithBorder from "../components/shared/WrapperWithBorder/WrapperWithBorder";
import InputGroup from "../components/shared/InputGroup/InputGroup";
import {faEnvelope, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {sendLink} from "../api/recover-api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

function Recover() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    sendLink(email)
      .then(response => {
        setIsLoading(false);
        toastr.success(response.data.message);
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
      <h1 className='text-2xl text-black font-bold'>You forgot your Password?</h1>
      <h2 className={'text-2xl text-black'}>{"Don't worry."}</h2>
      <p className='text-xs text-right mt-2'>
        Back to ?{' '}
        <Link to={'/login'} className={'text-black underline font-bold'}>
          Login
        </Link>
      </p>

      <hr className='bg-gray-500 mb-8'/>

      <form onSubmit={handleSubmit}>
        <InputGroup
          type={'email'}
          icon={faEnvelope}
          color={'#5a62cf'}
          placeholder={'Email Address'}
          onChangeHandler={(e) => setEmail(e.currentTarget.value)}
          required
        />

        <button className='py-2 w-full bg-main mt-3 disabled:opacity-80' type='submit' disabled={isLoading}>
          {
            !isLoading
              ? 'Send Password Reset Link'
              : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'}/>
          }
        </button>
      </form>
    </WrapperWithBorder>
  </Layout>
}

export default Recover;