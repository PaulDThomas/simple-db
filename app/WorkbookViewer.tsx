"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { IMPORT_DETAILS } from "./_context/appContextReducer";
import WorkbookColumns from "./WorkbookColumns";
import { getColumns } from "./_context/getColumns";
import WorkbookData from "./WorkbookData";

export default function WorkbookViewer() {
  const { state } = useContext(AppContext);
  const wb = state.workbook;

  return !wb ? (
    <div>No workbook loaded</div>
  ) : (
    <>
      <div>
        Sheets:
        <ul
          style={{
            marginBottom: "1rem",
          }}
        >
          {wb.SheetNames.map((s, i) => (
            <li
              key={i}
              style={{
                cursor: "pointer",
                backgroundColor:
                  s === state.importDetails[0].sheetName
                    ? "lightgreen"
                    : "inherit",
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
      <WorkbookColumns />
      <WorkbookData />
    </>
  );
}
