"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { IMPORT_DETAILS } from "./_context/appContextReducer";
import FieldTable from "./FieldTable";
import { getColumns } from "./_functions/getColumns";
import WorkbookData from "./WorkbookData";

export default function WorkbookViewer() {
  const { state } = useContext(AppContext);
  const wb = state.workbook;

  return !state.processed ? (
    <div>No workbook loaded</div>
  ) : (
    <>
      {wb && (
        <div>
          Sheets:
          <ul
            style={{
              marginBottom: "1rem",
            }}
          >
            {wb.SheetNames.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      <FieldTable groupName="TPV data agreements" />
      <WorkbookData />
    </>
  );
}
