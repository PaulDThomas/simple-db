import { iSimpleTableCellRenderProps } from "@asup/simple-table";
import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { DELETE_FIELD } from "../_context/appContextReducer";
import { Button } from "flowbite-react";
import { BiTrashAlt } from "react-icons/bi";

export const DeleteFieldButton = ({ rowData }: iSimpleTableCellRenderProps) => {
  const { dispatch } = useContext(AppContext);

  return (
    <Button
      size="sm"
      className="bg-red-600 h-6"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({
          operation: DELETE_FIELD,
          fieldName: rowData.fieldName as string,
        });
      }}
    >
      <BiTrashAlt size={18} />
    </Button>
  );
};
