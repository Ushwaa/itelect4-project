import React, { createContext, useContext, useReducer, type ReactNode } from "react";
import type { User, Course } from "../types/index";

export interface AppState {
  selectedUser: User | null;
  courses: Course[];
  theme: "light" | "dark";
  notifications: string[];
}

interface SetSelectedUserAction {
  type: "SET_SELECTED_USER";
  payload: User | null;
}

interface AddCourseAction {
  type: "ADD_COURSE";
  payload: Course;
}

interface RemoveCourseAction {
  type: "REMOVE_COURSE";
  payload: string;
}

interface ToggleThemeAction {
  type: "TOGGLE_THEME";
}

interface AddNotificationAction {
  type: "ADD_NOTIFICATION";
  payload: string;
}

interface ClearNotificationsAction {
  type: "CLEAR_NOTIFICATIONS";
}

export type AppAction =
  | SetSelectedUserAction
  | AddCourseAction
  | RemoveCourseAction
  | ToggleThemeAction
  | AddNotificationAction
  | ClearNotificationsAction;

const initialState: AppState = {
  selectedUser: null,
  courses: [],
  theme: "light",
  notifications: [],
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };

    case "REMOVE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((course: Course) => course.code !== action.payload),
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };

    default: {
      const exhaustiveCheck: never = action;
      void exhaustiveCheck;
      return state;
    }
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }): React.ReactElement => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value: AppContextValue = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
