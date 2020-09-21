import { Dispatch } from "redux";
// import { rootState } from "../reducers";
import { IReminder } from "../reducers/remindersReducer";

export const ADD_REMINDER = "ADD_REMINDER";
export const GET_REMINDERS = "GET_REMINDERS";
export const SET_REMINDER = "SET_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const DELETE_REMINDERS_FROM_LIST = "DELETE_REMINDERS_FROM_LIST";
export const EDIT_LIST_FOR_REMINDERS = "EDIT_LIST_FOR_REMINDERS";

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

interface deleteRemindersFromListAction {
  type: typeof DELETE_REMINDERS_FROM_LIST;
  list: string;
}

interface editListForReminders {
  type: typeof EDIT_LIST_FOR_REMINDERS;
  newList: string;
  oldList: string;
}

const addReminderAction = (
  reminder: string,
  forList: string
): ReminderActionTypes => {
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

const deleteRemindersFromListAction = (list: string): ReminderActionTypes => {
  return {
    type: DELETE_REMINDERS_FROM_LIST,
    list,
  };
};

const editListForReminders = (
  newList: string,
  oldList: string
): ReminderActionTypes => {
  return {
    type: EDIT_LIST_FOR_REMINDERS,
    newList,
    oldList,
  };
};

export const handleAddReminder = (reminder: string, forList: string) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(addReminderAction(reminder, forList));
  };
};

export const handleSetReminder = (reminder: IReminder) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(setReminderAction(reminder));
  };
};

export const handleDeleteReminder = (reminder: IReminder) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(deleteReminderAction(reminder));
  };
};

export const handleDeleteRemindersFromList = (list: string) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(deleteRemindersFromListAction(list));
  };
};

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

export const handleEditListForReminders = (
  newList: string,
  oldList: string
) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(editListForReminders(newList, oldList));
  };
};

export type ReminderActionTypes =
  | addReminderAction
  // | getRemindersAction
  | setReminderAction
  | deleteReminderAction
  | deleteRemindersFromListAction
  | editListForReminders;
