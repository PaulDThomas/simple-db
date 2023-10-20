import { useContext, useState } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { SET_FIELDS } from "../_context/appContextReducer";
import { retrieveFields } from "../_functions/retreiveFields";
import { Button, Spinner } from "flowbite-react";
import { BiCloudDownload } from "react-icons/bi";

export const LoadFieldsButton = () => {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  return (
    <Button
      size="sm"
      className="bg-green-600"
      disabled={state.fields !== null}
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);
        const newData = await retrieveFields();
        dispatch({ operation: SET_FIELDS, fields: newData });
        setLoading(false);
      }}
    >
      {loading ? <Spinner /> : <BiCloudDownload size={24} />}
      &nbsp;Load existing fields
    </Button>
  );
};
