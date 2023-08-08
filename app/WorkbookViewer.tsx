"use client";

import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";

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
    </>
  );
}
