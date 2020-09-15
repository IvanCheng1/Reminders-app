import React, { ChangeEvent } from "react";
// import { useDispatch } from "react-redux";
// import { handleAddReminder } from "../store/actions/remindersActions";

interface IProps {
  handleClickAddReminder: (reminder: string) => void
}

function ReminderInput({handleClickAddReminder}: IProps) {
  const [reminder, setReminder] = React.useState("");
  // const dispatch = useDispatch();

  const updateReminder = (e: ChangeEvent<HTMLInputElement>): void => {
    setReminder(e.target.value);
  };

  const addReminder = (): void => {
    // dispatch(handleAddReminder(reminder));
    handleClickAddReminder(reminder)
    setReminder("");
  };

  return (
    <>
      <input
        onChange={updateReminder}
        value={reminder}
        type="text"
        name="reminder"
        placeholder="reminder"
      />
      <button onClick={addReminder}>add reminder</button>
    </>
  );
}

export default ReminderInput;
