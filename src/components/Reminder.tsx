import React from "react";
import { IReminder } from "../reducers/remindersReducers";
import { useDispatch } from "react-redux";
import { handleSetReminder } from "../actions/remindersActions";

function Reminder({ r }: { r: IReminder }) {
  const dispatch = useDispatch()
  const setReminder = () => {
    dispatch(handleSetReminder(r));
  }

  return (
    <>
      <li>
        {r.reminder}
        {r.completed ? " - completed " : " - not completed "}
        <button onClick={setReminder}>complete</button>
        <button>delete</button>
      </li>
    </>
  );
}

export default Reminder;
