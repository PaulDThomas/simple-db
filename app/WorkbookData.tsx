"use client";

import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { SimpleTable, simpleTableSortFn } from "@asup/simple-table";
import EditableCell from "./EditableCell";

export default function WorkbookData() {
  const { state } = useContext(AppContext);

  return state.importDetails.length > 0 ? (
    <div
      style={{
        width: "90vw",
        minHeight: "200px",
        height: "30vh",
        border: "1px solid black",
        borderRadius: "4px",
      }}
    >
      {/* Some data */}
      <SimpleTable
        headerLabel={`Data from ${state.importDetails[0].sheetName}`}
        id="worksheet-data"
        keyField="id"
        mainBackgroundColor="inherit"
        headerBackgroundColor="inherit"
        fields={state.fields.map((wf) => ({
          name: wf.worksheetFieldName,
          label: wf.fieldLabel,
          sortFn: simpleTableSortFn,
          canColumnFilter: true,
          renderFn: EditableCell,
        }))}
        data={state.rows}
      />
    </div>
  ) : (
    <div>Waiting for sheet data</div>
  );
}
