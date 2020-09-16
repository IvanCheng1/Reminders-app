import { ADD_LIST, ListActionTypes } from "../actions/listActions";

export interface IList {
  name: string;
  // dateCreated: number
  // dateModified: number
}

export interface listState {
  lists: IList[];
}

const initialState = {
  lists: [],
};

export default function listReducer(
  state: listState = initialState,
  action: ListActionTypes
): listState {
  switch (action.type) {
    case ADD_LIST:
      console.log(ADD_LIST, state);
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    default:
      console.log("default case");
      return state;
  }
}
