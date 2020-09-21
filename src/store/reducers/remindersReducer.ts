import {
  ADD_REMINDER,
  DELETE_COMPLETED_REMINDERS_FROM_LIST,
  DELETE_REMINDER,
  DELETE_REMINDERS_FROM_LIST,
  EDIT_LIST_FOR_REMINDERS,
  // GET_REMINDERS,
  ReminderActionTypes,
  SET_REMINDER,
} from "../actions/remindersActions";

export interface IReminder {
  reminder: string;
  // dateCreated: number
  // dateModified: number
  completed: boolean;
  for: string;
}

export interface remindersState {
  reminders: IReminder[];
}

const initialState = {
  reminders: [
    {
      reminder: "Hello World!",
      completed: false,
      for: "Welcome!",
    },
  ],
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
    case DELETE_REMINDERS_FROM_LIST:
      console.log(DELETE_REMINDERS_FROM_LIST, state);
      return {
        ...state,
        reminders: state.reminders.filter((r) => r.for !== action.list),
      };
    case DELETE_COMPLETED_REMINDERS_FROM_LIST:
      console.log(DELETE_COMPLETED_REMINDERS_FROM_LIST, state);
      return {
        ...state,
        reminders: state.reminders.filter((r) => {
          if (r.for === action.list && r.completed === true) {
            return false;
          }
          return true;
        }),
      };
    case EDIT_LIST_FOR_REMINDERS:
      console.log(EDIT_LIST_FOR_REMINDERS, state);
      return {
        ...state,
        reminders: state.reminders.map((r) => {
          if (r.for === action.oldList) {
            r.for = action.newList;
          }
          return r;
        }),
      };
    default:
      console.log("default case");
      return state;
  }
}
