import {useState} from "react";
import {toggleTaskStatus} from "../../../api/tasks-api";
import toastr from "toastr";
import {setTaskStatus} from "../../../store/features/tasks/basketsSlice";
import {useDispatch} from "react-redux";
import CircleCheckboxInput from "../../shared/CircleCheckboxInput/CircleCheckboxInput";

export default function TaskCheckbox(
  {
    task,
    handleStatus = true,
    handleCheckboxChange = () => {
    }
  }
) {
  const [checked, setChecked] = useState(handleStatus ? task.done : false);
  const dispatch = useDispatch();

  function handleMarkAsDone(done) {
    toggleTaskStatus(task.id)
      .then(() => {
        dispatch(setTaskStatus(task));
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error)
      })
  }

  return <CircleCheckboxInput
    id={task.id}
    checked={checked}
    handleChange={() => {
      setChecked(!checked);
      if (handleStatus) {
        handleMarkAsDone(!checked);
      }
      handleCheckboxChange(task, !checked)
    }}
  />
}