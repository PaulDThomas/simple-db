import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { IMPORT_DATA } from "../_context/appContextReducer";
import { Button } from "flowbite-react";

export const ImportDataButton = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <Button
      size="sm"
      className="bg-violet-800 ml-1"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ operation: IMPORT_DATA });
      }}
      disabled={!state.workbook}
    >
      Import data
    </Button>
  );
};
