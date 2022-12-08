import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getUserCategories} from "../../../api/categories-api";
import ChooseBasket from "../ChooseBasket/ChooseBasket";
import {CHOOSE_AVATAR, CHOOSE_BASKET, DELEGATED_TASKS_DETAILS, SELECT_TASKS} from "../../../utils/constants/delegator";
import SelectBasketTasks from "../SelectBasketTasks/SelectBasketTasks";
import DelegatedTasksInfoForm from "../DelegatedTasksInfoForm/DelegatedTasksInfoForm";
import ChooseAvatar from "../ChooseAvatar/ChooseAvatar";
import {createDelegable} from "../../../api/delegables-api";
import toastr from "toastr";
import FloatingWrapper from "../../shared/FloatingWrapper/FloatingWrapper";

export default function CreateDelegableForm(
  {
    show = false,
    setShowCreateDelegableForm,
    delegables,
    setDelegables
  }
) {
  const [baskets, setBaskets] = useState(null);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [step, setStep] = useState(CHOOSE_BASKET);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    job: '',
    avatar: 1,
    tasks: [],
  });

  useEffect(() => {
    if (baskets === null) {
      getUserCategories()
        .then(response => {
          setBaskets(response.data.categories);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [baskets]);

  function handleSelectTask(task, isChecked) {
    formData.tasks = formData.tasks.filter(itemId => itemId !== task.id);
    if (isChecked) {
      formData.tasks.push(task.id)
    }
  }

  function handleFinish() {
    setIsLoading(true)
    createDelegable(formData)
      .then(response => {
        setIsLoading(false);
        setStep(CHOOSE_BASKET);
        setShowCreateDelegableForm(false);
        setDelegables([...delegables, response.data.delegable]);
        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsLoading(false)
        if (error.response) {
          toastr.error(error.response.data.message)
        }

        console.log(error);
      })
  }

  return <>
    {
      show
        ? <FloatingWrapper>
          <button className={'absolute top-1 right-2 text-sm'} onClick={() => {
            setShowCreateDelegableForm(false)
            setStep(CHOOSE_BASKET)
          }}>
            <FontAwesomeIcon icon={faClose}/>
          </button>

          {
            step === CHOOSE_BASKET
              ? <>
                <h3 className={'text-2xl text-white text-center mb-3'}>
                  Delegate a Task
                </h3>
                <ChooseBasket setStep={setStep} baskets={baskets} setSelectedBasket={(basket) => {
                  setSelectedBasket(basket)
                  setStep(SELECT_TASKS)
                }}/>
              </>
              : ''
          }
          {
            step === SELECT_TASKS
              ? <SelectBasketTasks setStep={setStep} selectedBasket={selectedBasket} handleSelectTask={handleSelectTask}/>
              : ''
          }
          {
            step === DELEGATED_TASKS_DETAILS
              ? <DelegatedTasksInfoForm setStep={setStep}
                                        job={formData.job}
                                        setJob={value => {
                                          setFormData({...formData, job: value})
                                        }}
                                        mission={formData.name}
                                        setMission={value => {
                                          setFormData({...formData, name: value})
                                        }}
                                        setShowCreateDelegableForm={setShowCreateDelegableForm}
                                        selectedBasket={selectedBasket}
                                        handleSelectTask={handleSelectTask}/>
              : ''
          }
          {
            step === CHOOSE_AVATAR
              ? <ChooseAvatar selectedAvatar={formData.avatar}
                              setAvatar={value => {
                                setFormData({...formData, avatar: value})
                              }}
                              handleFinish={handleFinish}
                              isLoading={isLoading}
                              setShowCreateDelegableForm={setShowCreateDelegableForm}/>
              : ''
          }
        </FloatingWrapper>
        : ''
    }
  </>;
};
