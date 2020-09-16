import { Dispatch } from "redux";
import { IList } from "../reducers/listReducer";

export const ADD_LIST = "ADD_LIST";
export const GET_LISTS = "GET_LISTS";
export const DELETE_LISTS = "DELETE_LISTS";

interface addListAction {
  type: typeof ADD_LIST;
  list: IList;
}

const addListAction = (nameOfList: string): ListActionTypes => {
  return {
    type: ADD_LIST,
    list: { name: nameOfList },
  };
};

export const handleAddList = (nameOfList: string) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(addListAction(nameOfList))
  }
}

export type ListActionTypes = addListAction;
