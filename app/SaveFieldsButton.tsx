import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { saveFields } from "./_functions/saveFields";
import { FieldRow } from "./api/fields/FieldRow";

interface SaveFieldsButtonProps {
  groupName: string;
}

export const SaveFieldsButton = ({ groupName }: SaveFieldsButtonProps) => {
  const { state } = useContext(AppContext);
  return (
    state.fields && (
      <button
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          saveFields(state.fields as FieldRow[]);
        }}
      >
        Save
      </button>
    )
  );
};
