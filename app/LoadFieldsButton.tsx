import { useContext } from "react";
import { retrieveFields } from "./_functions/retreiveFields";
import { AppContext } from "./_context/AppContextProvider";
import { SET_FIELDS } from "./_context/appContextReducer";

interface LoadFieldsButtonProps {
  groupName: string;
}

export const LoadFieldsButton = ({ groupName }: LoadFieldsButtonProps) => {
  const { dispatch } = useContext(AppContext);
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newData = await retrieveFields(groupName);
        dispatch({ operation: SET_FIELDS, fields: newData });
      }}
    >
      Load
    </button>
  );
};
