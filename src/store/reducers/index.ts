import { combineReducers } from "redux";
import remindersReducer from "./remindersReducer";


export const rootReducer = combineReducers({
  reminders: remindersReducer
})

export type rootState = ReturnType<typeof rootReducer>