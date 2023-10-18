import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { saveFields } from "../_functions/saveFields";
import { FieldRow } from "../api/fields/FieldRow";
import { Button } from "flowbite-react";

export const SaveFieldsButton = () => {
  const { state } = useContext(AppContext);
  return (
    state.fields && (
      <Button
        className="bg-red-500 ml-1"
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          saveFields(state.fields as FieldRow[]);
        }}
      >
        Save
      </Button>
    )
  );
};
