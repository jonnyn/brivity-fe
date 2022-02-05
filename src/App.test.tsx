import React from "react";
import { mount } from "@cypress/react";
import App from "./App";

it("renders welcome text", () => {
  mount(<App />);
  cy.get("a").contains("Welcome to Brivity!");
});
