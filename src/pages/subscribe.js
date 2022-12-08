import toastr from 'toastr';
import Layout from '../components/shared/Layout/Layout';
import CheckoutForm from '../components/others/CheckoutForm/CheckoutForm';
import { useEffect, useState } from 'react';
import { getClientSecret } from '../api/subscription-api';
import WrapperWithBorder from '../components/shared/WrapperWithBorder/WrapperWithBorder';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {getPublicKey} from "../utils/stripe/variables";

const stripePromise = loadStripe(getPublicKey());

function Subscribe() {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    if (clientSecret === null) {
      getClientSecret(abortController)
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        });
    }

    return () => {
      abortController.abort();
    };
  }, [clientSecret]);

  if (clientSecret === null) {
    return 'Loading...';
  }

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Layout>
      <script src='https://js.stripe.com/v3/'></script>
      <WrapperWithBorder>
        <h1 className={'text-3xl text-black mb-3'}>Premium Plan</h1>
        <p>
          Benefit from more advanced features by subscribing to our premium plan
          just for <strong>$3.00 per year</strong>.
        </p>
        <p>{"You'll benefit from a range of features exclusive to our premium users."}</p>
        <p className='mt-1'>The features list:</p>
        <ul className='list-disc px-5'>
          <li>Track progress of goals of the year.</li>
          <li>Help Tracker to delegate tasks.</li>
          <li>Add a goal easily by using the microphone (Audio Task).</li>
          <li>Use the calendar to plan tasks.</li>
          <li>One meditation session every 3 weeks.</li>
        </ul>
      </WrapperWithBorder>
      <WrapperWithBorder>
        <h1 className={'text-3xl text-black mb-3'}>Subscribe Now</h1>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </WrapperWithBorder>
    </Layout>
  );
};

export default Subscribe;