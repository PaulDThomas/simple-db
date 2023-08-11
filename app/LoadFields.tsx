"use client";

import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { retrieveFields } from "./_functions/retreiveFields";
import { SET_FIELDS } from "./_context/appContextReducer";

export const LoadFields = (props: { children: ReactNode }) => {
  const { state, dispatch } = useContext(AppContext);
  const [requested, setRequested] = useState<boolean>(false);

  const getFields = useCallback(async () => {
    setRequested(true);
    const newData = await retrieveFields();
    dispatch({ operation: SET_FIELDS, fields: newData });
  }, [dispatch]);

  useEffect(() => {
    if (!state.fields && !requested) {
      getFields();
    }
  }, [getFields, requested, state.fields]);

  return props.children;
};
