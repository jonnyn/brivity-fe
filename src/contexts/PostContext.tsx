import React, { createContext, useReducer, ReactNode } from "react";

type PostState = {
  scheme: string;
  error: Error | null;
};

const initialState: PostState = {
  scheme: "light",
  error: null,
};

const reducer = (state: PostState, action: Action) => {
  switch (action.type) {
    case "UPDATE_SCHEME":
      return {
        ...state,
        scheme: action.payload,
      };
    default:
      throw new Error();
  }
};

export const PostContext = createContext({});

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PostContext.Provider value={[state, dispatch]}>
      {children}
    </PostContext.Provider>
  );
};
