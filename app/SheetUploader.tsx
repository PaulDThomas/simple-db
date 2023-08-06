"use client";

import { useContext, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { PROCESSING_COMPLETE } from "./_context/appContextReducer";
import { saveWorkbook } from "./_context/saveWorkbook";

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
              saveWorkbook(e.target.files[0], async () => {
                dispatch({ operation: PROCESSING_COMPLETE });
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
