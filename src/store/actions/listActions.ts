import { Dispatch } from "redux";
import { IList } from "../reducers/listReducer";

export const ADD_LIST = "ADD_LIST";
export const GET_LISTS = "GET_LISTS";
export const DELETE_LIST = "DELETE_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const GET_FIRST_LIST = "GET_FIRST_LIST";

interface addListAction {
  type: typeof ADD_LIST;
  list: IList;
}

interface deleteListAction {
  type: typeof DELETE_LIST;
  list: IList;
}

interface editListAction {
  type: typeof EDIT_LIST;
  newList: string;
  oldList: string;
}

interface getFirstListAction {
  type: typeof GET_FIRST_LIST;
  notThisList?: string;
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

const editListAction = (newList: string, oldList: string): ListActionTypes => {
  return {
    type: EDIT_LIST,
    newList,
    oldList,
  };
};

const getFirstListAction = (notThisList?: string): ListActionTypes => {
  return {
    type: GET_FIRST_LIST,
    notThisList,
  };
};

export const handleAddList = (nameOfList: string) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(addListAction(nameOfList));
  };
};

export const handleDeleteList = (list: IList) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(deleteListAction(list));
  };
};

export const handleEditList = (newList: string, oldList: string) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(editListAction(newList, oldList));
  };
};

export const handleGetFirstList = (notThisList?: string) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(getFirstListAction(notThisList));
  };
};

export type ListActionTypes =
  | addListAction
  | deleteListAction
  | editListAction
  | getFirstListAction;
