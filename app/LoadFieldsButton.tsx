import { useContext } from "react";
import { retrieveFields } from "./_functions/retreiveFields";
import { AppContext } from "./_context/AppContextProvider";
import { SET_FIELDS } from "./_context/appContextReducer";

export const LoadFieldsButton = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newData = await retrieveFields();
        dispatch({ operation: SET_FIELDS, fields: newData });
      }}
    >
      Load
    </button>
  );
};