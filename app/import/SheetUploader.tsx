"use client";

import { useContext, useState } from "react";
import { AppContext } from "../_context/AppContextProvider";
import {
  IMPORT_FIELDS,
  PROCESSING_COMPLETE,
  SET_WORKBOOK,
} from "../_context/appContextReducer";
import { saveWorkbook } from "../_functions/saveWorkbook";
import { Button, FileInput, Label, Spinner } from "flowbite-react";

export default function SheetUploader() {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedFile, setLoadedFile] = useState<string>("");

  return (
    <>
      <div className="flex gap-2">
        {loading ? (
          <span>
            Loading... <Spinner />
          </span>
        ) : state.workbook !== null ? (
          <span className="text-lg">{loadedFile}</span>
        ) : (
          <FileInput
            className="block"
            id="xlsx-load"
            sizing="sm"
            aria-label="Upload spreadsheet"
            onChange={(e) => {
              if (e.target.files && e.target.files.length === 1) {
                setLoading(true);
                saveWorkbook(e.target.files[0], async (wb) => {
                  dispatch({ operation: SET_WORKBOOK, workbook: wb });
                  dispatch({ operation: PROCESSING_COMPLETE });
                  setLoading(false);
                  setLoadedFile((e.target.files as FileList)[0].name);
                });
              }
            }}
          />
        )}
        {/*  Think this is confusing if fields are already imported        
        {loadedFile !== "" && (
          <Button
            className="block"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({
                operation: IMPORT_FIELDS,
                fieldName: "TPV data agreements",
              });
            }}
          >
            Import fields
          </Button>
        )} */}
      </div>
    </>
  );
}
