import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { ADD_BLANK_FIELD } from "../_context/appContextReducer";
import { Button } from "flowbite-react";

export const AddFieldButton = () => {
  const { dispatch } = useContext(AppContext);

  return (
    <Button
      size="sm"
      className="bg-amber-400 ml-1"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ operation: ADD_BLANK_FIELD, groupName: "New group" });
      }}
    >
      Add field
    </Button>
  );
};
