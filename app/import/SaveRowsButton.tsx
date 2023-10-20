import { Button, Spinner } from "flowbite-react";
import { useContext, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { AppContext } from "../_context/AppContextProvider";
import { saveRows } from "../_functions/saveRows";
import { RowDataRow } from "../api/rowdata/RowDataRow";

export const SaveRowsButton = () => {
  const { state } = useContext(AppContext);
  const [saving, setSaving] = useState<boolean>(false);
  return (
    state.rows && (
      <Button
        className="bg-red-500 ml-1"
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          setSaving(true);
          await saveRows(state.rows as RowDataRow[]);
          setSaving(false);
        }}
      >
        {saving ? <Spinner /> : <BiCloudUpload size={24} />}
        Save
      </Button>
    )
  );
};
