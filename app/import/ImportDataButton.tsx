import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { IMPORT_DATA } from "../_context/appContextReducer";

export const ImportDataButton = () => {
  const { dispatch } = useContext(AppContext);

  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ operation: IMPORT_DATA });
      }}
    >
      Import data
    </button>
  );
};
