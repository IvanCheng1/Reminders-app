import {
  listState,
  initialListState,
  IList,
} from "../store/reducers/listReducer";
import {
  initialRemindersState,
  IReminder,
  remindersState,
} from "../store/reducers/remindersReducer";

const REMINDERS_STORAGE_KEY = "REMINDERS_STORAGE_KEY";
export const LISTS_STORAGE_KEY = "LISTS_STORAGE_KEY";

// ====================== LIST ======================

export const getListsFromLocalStorage = (): listState => {
  checkListsLocalStorage();
  return getLocalStorageList(LISTS_STORAGE_KEY);
};

export const addListToLocalStorage = (nameOfList: string): void => {
  const lists = {
    lists: [
      ...getLocalStorageList(LISTS_STORAGE_KEY).lists,
      { name: nameOfList },
    ],
  };
  setLocalStorageList(lists, LISTS_STORAGE_KEY);
};

export const deleteListFromLocalStorage = (list: IList): void => {
  const lists = {
    lists: getLocalStorageList(LISTS_STORAGE_KEY).lists.filter(
      (l) => l.name !== list.name
    ),
  };
  setLocalStorageList(lists, LISTS_STORAGE_KEY);
};

export const editListFromLocalStorage = (
  newList: string,
  oldList: string
): void => {
  const lists = {
    lists: getLocalStorageList(LISTS_STORAGE_KEY).lists.map((l) => {
      if (l.name === oldList) {
        l.name = newList;
      }
      return l;
    }),
  };
  setLocalStorageList(lists, LISTS_STORAGE_KEY);
};

const checkListsLocalStorage = (): void => {
  if (localStorage.getItem(LISTS_STORAGE_KEY) === null) {
    setLocalStorageList(initialListState, LISTS_STORAGE_KEY);
  }
};

const setLocalStorageList = (items: listState, key: string): void => {
  localStorage.setItem(key, JSON.stringify(items));
};

const getLocalStorageList = (key: string): listState => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

// ====================== REMINDER ======================

export const getRemindersFromLocalStorage = (): remindersState => {
  checkRemindersLocalStorage();
  // setLocalStorageReminder(initialRemindersState)
  return getLocalStorageReminder();
};

export const addReminderToLocalStorage = (
  reminder: string,
  forList: string
): void => {
  const reminders = {
    reminders: [
      ...getLocalStorageReminder().reminders,
      {
        reminder,
        completed: false,
        for: forList,
      },
    ],
  };

  setLocalStorageReminder(reminders);
};

export const setReminderToLocalStorage = (
  reminder: IReminder,
  list: string
): void => {
  const reminders = {
    reminders: getLocalStorageReminder().reminders.map((r) => {
      if (r.reminder === reminder.reminder && r.for === list) {
        return {
          ...r,
          completed: !r.completed,
        };
      }
      return r;
    }),
  };
  setLocalStorageReminder(reminders);
};

export const deleteReminderFromLocalStorage = (reminder: IReminder): void => {
  const reminders = {
    reminders: getLocalStorageReminder().reminders.filter(
      (r) =>
        r.reminder !== reminder.reminder ||
        r.for !== reminder.for ||
        r.completed !== reminder.completed
    ),
  };
  setLocalStorageReminder(reminders);
};

const checkRemindersLocalStorage = (): void => {
  if (localStorage.getItem(REMINDERS_STORAGE_KEY) === null) {
    setLocalStorageReminder(initialRemindersState);
  }
};

const setLocalStorageReminder = (reminders: remindersState): void => {
  localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
};

const getLocalStorageReminder = (): remindersState => {
  return JSON.parse(localStorage.getItem(REMINDERS_STORAGE_KEY) || "{}");
};

// ====================== OTHER ======================

export {}; // to avoid TS error
