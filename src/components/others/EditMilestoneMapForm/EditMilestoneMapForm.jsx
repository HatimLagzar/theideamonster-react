import {faCheck, faClose, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FloatingWrapper from "../../shared/FloatingWrapper/FloatingWrapper";
import {useState} from "react";
import toastr from "toastr";
import InputGroup from "../../shared/InputGroup/InputGroup";
import {updateMilestone} from "../../../api/map-api";
import moment from "moment";

function EditMilestoneMapForm({handleCloseClick, milestone, setMilestones, milestones, setSelectedMilestone}) {
  const [isLoading, setIsLoading] = useState(false);
  const [endsAt, setEndsAt] = useState(milestone.ends_at);

  function handleFinish(e) {
    e.preventDefault();

    setIsLoading(true);

    updateMilestone(milestone.id, endsAt, milestone.basket_id, milestone.percentage, milestone.is_done)
      .then(response => {
        const now = moment(new Date());
        const end = moment(endsAt);
        setIsLoading(false);
        setMilestones([...milestones.map(item => {
          if (item.id === milestone.id) {
            item.ends_at = endsAt;
            item.difference = Math.floor(moment.duration(end.diff(now)).asDays());
          }

          return item;
        })])
        setSelectedMilestone({
          ...milestone,
          ends_at: endsAt,
          difference: Math.floor(moment.duration(end.diff(now)).asDays()),
        });
        handleCloseClick();
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
    }}>
      <FontAwesomeIcon icon={faClose}/>
    </button>
    <h3 className={'text-2xl text-white text-center mb-3'}>
      Edit Milestone
    </h3>

    <form onSubmit={handleFinish}>
      <label htmlFor="endsAtInput">Due Date</label>
      <InputGroup type={'date'}
                  id={'endsAtInput'}
                  placeholder={'Enter Due Date'}
                  color={'#ccc'}
                  hasBorder={false}
                  rounded
                  onChangeHandler={e => setEndsAt(e.currentTarget.value)}
                  defaultValue={endsAt}
      />
      <button
        key={'delegable-basket-next'}
        className={'block ml-auto leading-none font-semibold font-montserrat mt-3'}
      >
        Update {
        !isLoading
          ? <FontAwesomeIcon icon={faCheck} size={'1x'}/>
          : <FontAwesomeIcon icon={faSpinner} className={'fa-spin'} size={'1x'}/>
      }
      </button>
    </form>

  </FloatingWrapper>
}

export default EditMilestoneMapForm;