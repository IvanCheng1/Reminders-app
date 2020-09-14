import {
  ADD_REMINDER,
  DELETE_REMINDER,
  ReminderActionTypes,
  SET_REMINDER,
} from "../actions/remindersActions";

export interface IReminder {
  reminder: string;
  // dateCreated: number
  // dateModified: number
  completed: boolean;
}

export interface remindersState {
  reminders: IReminder[];
}

const initialState = {
  reminders: [],
};

export default function remindersReducers(
  state: remindersState = initialState,
  action: ReminderActionTypes
) {
  switch (action.type) {
    case ADD_REMINDER:
      console.log(ADD_REMINDER, state);
      return {
        ...state,
        reminders: [...state.reminders, action.reminder],
      };
    case SET_REMINDER:
      console.log(SET_REMINDER, state);
      return {
        ...state,
        reminders: state.reminders.map((r) => {
          if (r.reminder !== action.reminder.reminder) {
            return r;
          } else {
            return {
              ...r,
              completed: !r.completed,
            };
          }
        }),
      };
    case DELETE_REMINDER:
      console.log(DELETE_REMINDER, state);
      return {
        ...state,
        reminders: state.reminders.filter((r) => r !== action.reminder)
      }
    default:
      console.log("default case");
      return state;
  }
}
