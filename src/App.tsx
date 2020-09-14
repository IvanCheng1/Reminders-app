import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Reminder from "./components/Reminder";
import ReminderInput from "./components/ReminderInput";
import { remindersState } from "./reducers/remindersReducers";

function App() {
  const reminders = useSelector<remindersState, remindersState["reminders"]>(
    (state) => state.reminders
  );

  return (
    <div className="App">
      Reminders
      <ReminderInput />
      {/* <hr /> */}
      <ul>
        {reminders.map((r) => (
          <Reminder r={r}  key={r.reminder}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
