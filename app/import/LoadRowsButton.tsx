import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { SET_ROWS } from "../_context/appContextReducer";
import { retrieveRows } from "../_functions/retreiveRows";

export const LoadRowsButton = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newData = await retrieveRows();
        dispatch({ operation: SET_ROWS, rows: newData });
      }}
    >
      Load
    </button>
  );
};
