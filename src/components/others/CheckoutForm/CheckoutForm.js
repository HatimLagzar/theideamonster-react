import { useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { RETURN_URL_AFTER_SUCCESSFUL_SUBSCRIPTION } from '../../../utils/constants/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function CheckoutForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { setupIntent, error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: RETURN_URL_AFTER_SUCCESSFUL_SUBSCRIPTION,
      },
    });

    console.log(setupIntent);

    setIsLoading(false);

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className={'bg-main text-white py-2 px-7 rounded-full mt-3 shadow-xl'}
        disabled={!stripe}
      >
        {!isLoading ? (
          'Subscribe only for $20.00 per month'
        ) : (
          <FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
        )}
      </button>

      {/* Show error message to your customers */}
      {errorMessage && <p className={'text-red-500 mt-3'}>{errorMessage}</p>}
    </form>
  );
}
