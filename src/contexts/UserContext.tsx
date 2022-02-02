/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { createContext, useReducer, ReactNode } from "react";

type UserState = {
  locale: string;
  scheme: string;
  loggedIn: Boolean;
  error: Error | null;
};

const initialState: UserState = {
  locale: "en",
  scheme: "light",
  loggedIn: false,
  error: null,
};

const reducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case "UPDATE_LOCALE":
      return {
        ...state,
        locale: action.payload,
      };
    case "UPDATE_SCHEME":
      return {
        ...state,
        scheme: action.payload,
      };
    case "UPDATE_LOGIN":
      return {
        ...state,
        loggedIn: action.payload,
      };
    default:
      throw new Error();
  }
};

export const UserContext = createContext<any>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
