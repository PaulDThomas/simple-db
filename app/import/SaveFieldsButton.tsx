import { useContext, useState } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { saveFields } from "../_functions/saveFields";
import { FieldRow } from "../api/fields/FieldRow";
import { Button, Spinner } from "flowbite-react";
import { BiCloudUpload } from "react-icons/bi";

export const SaveFieldsButton = () => {
  const { state } = useContext(AppContext);
  const [saving, setSaving] = useState(false);
  return (
    state.fields && (
      <Button
        className="bg-red-500 ml-1"
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          setSaving(true);
          await saveFields(state.fields as FieldRow[]);
          setSaving(false);
        }}
      >
        {saving ? <Spinner /> : <BiCloudUpload size={24} />}
        Save
      </Button>
    )
  );
};
