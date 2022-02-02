import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "routes";
import AppContextProvider from "contexts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  </QueryClientProvider>
);

export default App;
