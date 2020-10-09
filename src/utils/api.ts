import { listState, initialListState } from "../store/reducers/listReducer";

// const REMINDERS_STORAGE_KEY = "REMINDERS_STORAGE_KEY";
export const LISTS_STORAGE_KEY = "LISTS_STORAGE_KEY";

export const getListsFromLocalStorage =  (): listState => {
  checkListsLocalStorage();
  return getLocalStorage(LISTS_STORAGE_KEY);
};

export const addListToLocalStorage = (nameOfList: string): void => {
  const lists = [
    ...getLocalStorage(LISTS_STORAGE_KEY).lists,
    { name: nameOfList },
  ];
  setLocalStorage({ lists }, LISTS_STORAGE_KEY);
};

const checkListsLocalStorage = (): void => {
  if (localStorage.getItem(LISTS_STORAGE_KEY) === null) {
    setLocalStorage(initialListState, LISTS_STORAGE_KEY);
  }
};

const setLocalStorage = (items: listState, key: string): void => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const getLocalStorage = (key: string): listState => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export {}; // to avoid TS error
