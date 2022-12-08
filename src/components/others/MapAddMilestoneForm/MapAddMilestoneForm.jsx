import {faCheck, faClose, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FloatingWrapper from "../../shared/FloatingWrapper/FloatingWrapper";
import {useState} from "react";
import {CHOOSE_BASKET, SET_DATES} from "../../../utils/constants/map";
import ChooseBasket from "../ChooseBasket/ChooseBasket";
import toastr from "toastr";
import InputGroup from "../../shared/InputGroup/InputGroup";
import {createMilestone} from "../../../api/map-api";

function MapAddMilestoneForm({handleCloseClick, baskets, setBaskets, setMilestones, milestones}) {
  const [step, setStep] = useState(CHOOSE_BASKET);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [endsAt, setEndsAt] = useState(null);

  function handleFinish(e) {
    e.preventDefault();

    setIsLoading(true);

    createMilestone(endsAt, selectedBasket.id)
      .then(response => {
        setIsLoading(false);
        setMilestones([...milestones, response.data.milestone]);
        handleCloseClick();
        setStep(CHOOSE_BASKET);
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

  return <FloatingWrapper styles={{bottom: '25%', position: 'absolute'}}>
    <button className={'absolute top-1 right-2 text-sm'} onClick={() => {
      handleCloseClick()
      setStep(CHOOSE_BASKET)
    }}>
      <FontAwesomeIcon icon={faClose}/>
    </button>
    <h3 className={'text-2xl text-white text-center mb-3'}>
      Add New Milestone
    </h3>
    {
      step === CHOOSE_BASKET
        ? <ChooseBasket setStep={setStep}
                        baskets={baskets}
                        setSelectedBasket={(basket) => {
                          setSelectedBasket(basket);
                          setStep(SET_DATES);
                        }}/>
        : ''
    }
    {
      step === SET_DATES
        ? <form onSubmit={handleFinish}>
          <label htmlFor="endsAtInput">Due Date</label>
          <InputGroup type={'date'}
                      id={'endsAtInput'}
                      placeholder={'Enter Due Date'}
                      color={'#ccc'}
                      hasBorder={false}
                      rounded
                      onChangeHandler={e => setEndsAt(e.currentTarget.value)}
          />
          <button
            key={'delegable-basket-next'}
            className={'block ml-auto leading-none font-semibold font-montserrat mt-3'}
          >
            Finish {
            !isLoading
              ? <FontAwesomeIcon icon={faCheck} size={'1x'}/>
              : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'} size={'1x'}/>
          }
          </button>
        </form>
        : ''
    }
  </FloatingWrapper>
}

export default MapAddMilestoneForm;