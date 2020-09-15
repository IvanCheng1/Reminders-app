import React from "react";
import { IReminder } from "../store/reducers/remindersReducer";
// import { useDispatch } from "react-redux";
// import { handleDeleteReminder, handleSetReminder } from "../store/actions/remindersActions";

function Reminder({ r }: { r: IReminder }) {
  // const dispatch = useDispatch()

  const setReminder = () => {
    // dispatch(handleSetReminder(r));
  }

  const deleteReminder = () => {
    // dispatch(handleDeleteReminder(r))
  }

  return (
    <>
      <li>
        {r.reminder}
        {r.completed ? " - completed " : " - not completed "}
        <button onClick={setReminder}>complete</button>
        <button onClick={deleteReminder}>delete</button>
      </li>
    </>
  );
}

export default Reminder;
