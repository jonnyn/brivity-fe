import React from "react";
import AppRoutes from "routes";
import AppContextProvider from "contexts";
import "./App.css";

const App = () => (
  <AppContextProvider>
    <AppRoutes />
  </AppContextProvider>
);

export default App;
