import { getListsFromLocalStorage, getLocalStorage, LISTS_STORAGE_KEY } from "../../utils/api";
import {
  ADD_LIST,
  DELETE_LIST,
  EDIT_LIST,
  ListActionTypes,
} from "../actions/listActions";

export interface IList {
  name: string;
  // dateCreated: number
  // dateModified: number
}

export interface listState {
  lists: IList[];
}

export const initialListState = {
  lists: [
    {
      name: "Welcome!",
    },
  ],
};

export default function listReducer(
  // state: listState = initialListState,
  state: listState = getListsFromLocalStorage(),
  action: ListActionTypes
): listState {
  switch (action.type) {
    case ADD_LIST:
      // console.log(ADD_LIST, state);
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    case DELETE_LIST:
      // console.log(DELETE_LIST, state);
      return {
        ...state,
        lists: state.lists.filter((l) => l.name !== action.list.name),
      };
    case EDIT_LIST:
      // console.log(EDIT_LIST, state);
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.name === action.oldList) {
            l.name = action.newList;
          }
          return l;
        }),
      };
    default:
      // console.log("default case");
      return state;
  }
}
