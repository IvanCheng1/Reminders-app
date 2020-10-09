import { Dispatch } from "redux";
import {
  addReminderToLocalStorage,
  setReminderToLocalStorage,
} from "../../utils/api";
// import { rootState } from "../reducers";
import { IReminder } from "../reducers/remindersReducer";

export const ADD_REMINDER = "ADD_REMINDER";
export const GET_REMINDERS = "GET_REMINDERS";
export const SET_REMINDER = "SET_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const DELETE_REMINDERS_FROM_LIST = "DELETE_REMINDERS_FROM_LIST";
export const DELETE_COMPLETED_REMINDERS_FROM_LIST =
  "DELETE_COMPLETED_REMINDERS_FROM_LIST";
export const EDIT_REMINDER = "EDIT_REMINDER";
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
  list: string;
}

interface deleteReminderAction {
  type: typeof DELETE_REMINDER;
  reminder: IReminder;
}

interface deleteRemindersFromListAction {
  type: typeof DELETE_REMINDERS_FROM_LIST;
  list: string;
}

interface deleteCompletedRemindersFromList {
  type: typeof DELETE_COMPLETED_REMINDERS_FROM_LIST;
  list: string;
}

interface editReminder {
  type: typeof EDIT_REMINDER;
  newReminder: string;
  oldReminder: string;
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

const setReminderAction = (
  reminder: IReminder,
  list: string
): ReminderActionTypes => {
  return {
    type: SET_REMINDER,
    reminder,
    list,
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

const editReminder = (
  newReminder: string,
  oldReminder: string,
  list: string
): ReminderActionTypes => {
  return {
    type: EDIT_REMINDER,
    newReminder,
    oldReminder,
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

const deleteCompletedRemindersFromList = (
  list: string
): ReminderActionTypes => {
  return {
    type: DELETE_COMPLETED_REMINDERS_FROM_LIST,
    list,
  };
};

export const handleAddReminder = (reminder: string, forList: string) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(addReminderAction(reminder, forList));
    addReminderToLocalStorage(reminder, forList);
  };
};

export const handleSetReminder = (reminder: IReminder, list: string) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(setReminderAction(reminder, list));
    setReminderToLocalStorage(reminder, list);
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

export const handleDeleteCompletedRemindersFromList = (list: string) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(deleteCompletedRemindersFromList(list));
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

export const handleEditReminder = (
  newReminder: string,
  oldReminder: string,
  list: string
) => {
  return (dispatch: Dispatch<ReminderActionTypes>) => {
    dispatch(editReminder(newReminder, oldReminder, list));
  };
};

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
  | editListForReminders
  | editReminder
  | deleteCompletedRemindersFromList;
