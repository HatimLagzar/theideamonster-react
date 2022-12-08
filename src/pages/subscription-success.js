import toastr from "toastr";
import Layout from "../components/shared/Layout/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {confirmSubscription} from "../api/subscription-api";
import {useNavigate} from "react-router-dom";

function SubscribeSuccess() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {setup_intent} = navigate.query

  useEffect(() => {
    const abortController = new AbortController();

    if (setup_intent) {
      confirmSubscription(setup_intent, abortController)
        .then(response => {
          setIsLoading(false)
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        })
    }

    return () => {
      abortController.abort();
    }
  }, [setup_intent])
  return <Layout>
    <div className="text mt-20 px-10">
      {
        isLoading
          ? <>
            <FontAwesomeIcon icon={faSpinner} size={'5x'} className={'block mx-auto text-red-700 fa-spin'}/>
            <h1 className={'text-2xl text-red-700 text-center mt-3'}>{"Please wait and don't quit this page, we are confirming your subscription..."}</h1>
          </>
          : <>
            <FontAwesomeIcon icon={faCheckCircle} size={'5x'} className={'block mx-auto text-green-700'}/>
            <h1 className={'text-2xl text-green-700 text-center'}>Congrats, you successfully subscribed to our premium
              plan.</h1>
          </>
      }
    </div>
  </Layout>
}

export default SubscribeSuccess;