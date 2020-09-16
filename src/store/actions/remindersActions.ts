import { Dispatch } from "redux";
// import { rootState } from "../reducers";
import { IReminder } from "../reducers/remindersReducer";

export const ADD_REMINDER = "ADD_REMINDER";
export const GET_REMINDERS = "GET_REMINDERS";
export const SET_REMINDER = "SET_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";

interface addReminderAction {
  type: typeof ADD_REMINDER;
  reminder: IReminder;
}

// interface getRemindersAction {
//   type: typeof GET_REMINDERS;
//   // reminder: IReminder[];
// }

interface setReminderAction {
  type: typeof SET_REMINDER;
  reminder: IReminder;
}

interface deleteReminderAction {
  type: typeof DELETE_REMINDER;
  reminder: IReminder;
}

const addReminderAction = (reminder: string, forList: string): ReminderActionTypes => {
  return {
    type: ADD_REMINDER,
    reminder: { reminder, completed: false, for: forList },
  };
};

// const getRemindersAction = (): ReminderActionTypes => {
//   return {
//     type: GET_REMINDERS,
//     // reminder: []
//   }
// }

const setReminderAction = (reminder: IReminder): ReminderActionTypes => {
  return {
    type: SET_REMINDER,
    reminder,
  };
};

const deleteReminderAction = (reminder: IReminder): ReminderActionTypes => {
  return {
    type: DELETE_REMINDER,
    reminder,
  };
};

export const handleAddReminder = (reminder: string, forList: string) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(addReminderAction(reminder, forList))
  }
}

export const handleSetReminder = (reminder: IReminder) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(setReminderAction(reminder))
  }
}

export const handleDeleteReminder = (reminder: IReminder) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(deleteReminderAction(reminder))
  }
}

// export const handleGetReminders = () => {
//   return (dispatch: Dispatch<ReminderActionTypes>) => {
//     dispatch(getRemindersAction())
//   }
// }

// export const handleAddReminderWState = (reminder: string) => {
//   return (dispatch: Dispatch<ReminderActionTypes>, getState: () => rootState) => {
//     dispatch(addReminderAction(reminder))
//   }
// }

export type ReminderActionTypes =
  | addReminderAction
  // | getRemindersAction
  | setReminderAction
  | deleteReminderAction;
