import { useContext, useState } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { SET_ROWS } from "../_context/appContextReducer";
import { retrieveRows } from "../_functions/retreiveRows";
import { Button, Spinner } from "flowbite-react";
import { BiCloudDownload } from "react-icons/bi";

export const LoadRowsButton = () => {
  const { dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Button
      size="sm"
      className="bg-green-600"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);
        const newData = await retrieveRows();
        dispatch({ operation: SET_ROWS, rows: newData });
        console.log(
          newData
            .map((d) => d.simple_table_row.studyName)
            .filter((s) => s !== undefined)
        );
        setLoading(false);
      }}
    >
      {loading ? <Spinner /> : <BiCloudDownload size={24} />}
      &nbsp;Load data
    </Button>
  );
};
