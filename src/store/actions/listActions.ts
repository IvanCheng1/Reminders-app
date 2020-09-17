import { Dispatch } from "redux";
import { IList } from "../reducers/listReducer";

export const ADD_LIST = "ADD_LIST";
export const GET_LISTS = "GET_LISTS";
export const DELETE_LIST = "DELETE_LIST";

interface addListAction {
  type: typeof ADD_LIST;
  list: IList;
}

interface deleteListAction {
  type: typeof DELETE_LIST;
  list: IList;
}

const addListAction = (nameOfList: string): ListActionTypes => {
  return {
    type: ADD_LIST,
    list: { name: nameOfList },
  };
};

const deleteListAction = (list: IList): ListActionTypes => {
  return {
    type: DELETE_LIST,
    list,
  };
};

export const handleAddList = (nameOfList: string) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(addListAction(nameOfList));
  };
};

export const handleDeleteList = (list: IList) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(deleteListAction(list))
  }
}

export type ListActionTypes = addListAction | deleteListAction;
