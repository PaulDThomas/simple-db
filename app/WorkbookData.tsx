"use client";

import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { SimpleTable, simpleTableSortFn } from "@asup/simple-table";
import EditableFieldCell from "./EditableFieldCell";

export default function WorkbookData() {
  const { state } = useContext(AppContext);

  return state.fields && state.rows && state.fields.length > 0 ? (
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
        headerLabel={`Data from ${
          state.workbook?.SheetNames[0] ?? "some spreadhseet"
        }`}
        id="worksheet-data"
        keyField="id"
        mainBackgroundColor="inherit"
        headerBackgroundColor="inherit"
        fields={state.fields.map((wf) => ({
          name: wf.simple_table_row.worksheetFieldName,
          label: wf.simple_table_row.fieldLabel,
          sortFn: simpleTableSortFn,
          canColumnFilter: true,
          renderFn: EditableFieldCell,
        }))}
        data={state.rows}
      />
    </div>
  ) : (
    <div>Waiting for sheet data</div>
  );
}
