"use client";

import { Dispatch, ReactNode, createContext, useReducer } from "react";
import {
  AppActionProps,
  appContextReducer,
  appState,
} from "./appContextReducer";

export interface AppContextProps {
  state: appState;
  dispatch: Dispatch<AppActionProps>;
}

const defaultAppContext: appState = {
  name: "",
  processed: false,
  workbook: null,
  fields: [],
  rows: [],
  importDetails: [{ sheetName: "", fields: [], rows: [] }],
};

export const AppContext = createContext<AppContextProps>({
  state: defaultAppContext,
  dispatch: () => undefined,
});

interface AppContextProviderProps {
  children: ReactNode;
}

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [state, dispatch] = useReducer(appContextReducer, defaultAppContext);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
