import { iSimpleTableCellRenderProps } from "@asup/simple-table";
import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { DELETE_FIELD } from "./_context/appContextReducer";

export const DeleteFieldButton = ({ rowData }: iSimpleTableCellRenderProps) => {
  const { dispatch } = useContext(AppContext);

  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({
          operation: DELETE_FIELD,
          fieldName: rowData.fieldName as string,
        });
      }}
    >
      x {(rowData.id as string).slice(0, 4)}
    </button>
  );
};
