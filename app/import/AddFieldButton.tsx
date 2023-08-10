import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { ADD_BLANK_FIELD } from "../_context/appContextReducer";

export const AddFieldButton = () => {
  const { dispatch } = useContext(AppContext);

  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ operation: ADD_BLANK_FIELD, groupName: "New group" });
      }}
    >
      Add field
    </button>
  );
};
