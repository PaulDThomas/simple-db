import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { SET_FIELDS } from "../_context/appContextReducer";
import { retrieveFields } from "../_functions/retreiveFields";
import { Button } from "flowbite-react";
import { BiCloudDownload } from "react-icons/bi";

export const LoadFieldsButton = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <Button
      size="sm"
      className="bg-green-600"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newData = await retrieveFields();
        dispatch({ operation: SET_FIELDS, fields: newData });
      }}
    >
      <BiCloudDownload size={24} />
      {!state.workbook ? "Load existing" : "Reload "} fields
    </Button>
  );
};
