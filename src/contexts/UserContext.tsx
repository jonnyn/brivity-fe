import React, { createContext, useReducer, ReactNode } from "react";

type UserState = {
  locale: string;
  user: User | null;
  error: Error | null;
};

const initialState: UserState = {
  locale: "en",
  user: null,
  error: null,
};

const reducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case "SET_LOCALE":
      return {
        ...state,
        locale: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
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
