import {
  ADD_REMINDER,
  DELETE_REMINDER,
  // GET_REMINDERS,
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

export default function remindersReducer(
  state: remindersState = initialState,
  action: ReminderActionTypes
): remindersState {
  switch (action.type) {
    // case GET_REMINDERS:
    //   console.log(GET_REMINDERS, state);
    //   return {
    //     ...state,
    //   }
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
        reminders: state.reminders.filter((r) => r !== action.reminder),
      };
    default:
      console.log("default case");
      return state;
  }
}
