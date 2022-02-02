/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { createContext, useReducer, ReactNode } from "react";

type CommentState = {
  locale: string;
  scheme: string;
  error: Error | null;
};

const initialState: CommentState = {
  locale: "en",
  scheme: "light",
  error: null,
};

const reducer = (state: CommentState, action: Action) => {
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
    default:
      throw new Error();
  }
};

export const CommentContext = createContext({});

export const CommentContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CommentContext.Provider value={[state, dispatch]}>
      {children}
    </CommentContext.Provider>
  );
};
