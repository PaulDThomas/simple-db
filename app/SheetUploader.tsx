"use client";

import { useContext, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { IMPORT_DETAILS, LOAD_WORKBOOK } from "./_context/appContextReducer";
import { load } from "./_context/load";

export default function SheetUploader() {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedFile, setLoadedFile] = useState<string>("");

  return (
    <div>
      <label
        htmlFor="xlsx-load"
        style={{
          paddingRight: "4px",
        }}
      >
        Upload file:
      </label>
      {loading ? (
        <span>Loading...</span>
      ) : state.workbook !== null ? (
        <span>Loaded: {loadedFile}</span>
      ) : (
        <input
          id="xlsx-load"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length === 1) {
              setLoading(true);
              load(e.target.files[0], async (wb, sheetKeys) => {
                dispatch({ operation: LOAD_WORKBOOK, workbook: wb });
                if (sheetKeys)
                  dispatch({
                    operation: IMPORT_DETAILS,
                    importDetails: sheetKeys,
                  });
                setLoading(false);
                setLoadedFile((e.target.files as FileList)[0].name);
              });
            }
          }}
        />
      )}
    </div>
  );
}
