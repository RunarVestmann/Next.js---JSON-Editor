import { createContext, useContext } from "react";

const DataContext = createContext({
  data: {},
  updateField: (keys: string[], value: unknown) => {},
});

export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = DataContext.Provider;
