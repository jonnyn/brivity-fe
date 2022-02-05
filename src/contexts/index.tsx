import React, { ComponentProps, FC } from "react";
import { UserContextProvider, UserContext } from "./UserContext";
import { PostContextProvider, PostContext } from "./PostContext";
import { CommentContextProvider, CommentContext } from "./CommentContext";

const providers = [
  UserContextProvider,
  PostContextProvider,
  CommentContextProvider,
  // add more context provider
];

const AppContextProvider = providers.reduce(
  (AccumulatedComponents, CurrentComponent) => {
    return ({ children }: ComponentProps<FC>): JSX.Element => (
      <AccumulatedComponents>
        <CurrentComponent>{children}</CurrentComponent>
      </AccumulatedComponents>
    );
  },
  ({ children }) => <>{children}</>
);

export { UserContext, PostContext, CommentContext };
export default AppContextProvider;
