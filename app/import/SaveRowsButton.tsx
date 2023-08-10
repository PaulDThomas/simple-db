import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { saveRows } from "../_functions/saveRows";
import { RowDataRow } from "../api/rowdata/RowDataRow";

export const SaveRowsButton = () => {
  const { state } = useContext(AppContext);
  return (
    state.rows && (
      <button
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          saveRows(state.rows as RowDataRow[]);
        }}
      >
        Save
      </button>
    )
  );
};
