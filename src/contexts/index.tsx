import React, { ComponentProps, FC } from "react";
import { UserContextProvider } from "./UserContext";
import { PostContextProvider } from "./PostContext";
import { CommentContextProvider } from "./CommentContext";

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

export default AppContextProvider;
