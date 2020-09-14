import { IReminder } from "../reducers/remindersReducers";

export const ADD_REMINDER = "ADD_REMINDER";
export const GET_REMINDERS = "GET_REMINDERS";
export const SET_REMINDER = "SET_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";

interface addReminderAction {
  type: typeof ADD_REMINDER;
  reminder: IReminder;
}

interface getRemindersAction {
  type: typeof GET_REMINDERS;
}

interface setReminderAction {
  type: typeof SET_REMINDER;
  reminder: IReminder;
}

interface deleteReminderAction {
  type: typeof DELETE_REMINDER;
  reminder: IReminder;
}

export const handleAddReminder = (reminder: string): ReminderActionTypes => {
  return {
    type: ADD_REMINDER,
    reminder: { reminder, completed: false },
  };
};

export const handleSetReminder = (reminder: IReminder): ReminderActionTypes => {
  return {
    type: SET_REMINDER,
    reminder,
  };
};

export const handleDeleteReminder = (
  reminder: IReminder
): ReminderActionTypes => {
  return {
    type: DELETE_REMINDER,
    reminder,
  };
};

export type ReminderActionTypes =
  | addReminderAction
  | getRemindersAction
  | setReminderAction
  | deleteReminderAction;
