"use client";

import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";
import {
  SimpleTable,
  iSimpleTableRow,
  simpleTableSortFn,
} from "@asup/simple-table";
import EditableFieldCell from "./EditableFieldCell";
import { SaveRowsButton } from "./SaveRowsButton";
import { LoadRowsButton } from "./LoadRowsButton";

export default function WorkbookData() {
  const { state } = useContext(AppContext);

  return state.fields && state.rows && state.fields.length > 0 ? (
    <div
      style={{
        width: "90vw",
        minHeight: "200px",
        height: "40vh",
        border: "1px solid black",
        borderRadius: "4px",
        marginTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <LoadRowsButton />
      <SaveRowsButton />
      <SimpleTable
        headerLabel={`Data from ${
          state.workbook?.SheetNames[0] ?? "some spreadhseet"
        }`}
        id="worksheet-data"
        keyField="id"
        mainBackgroundColor="inherit"
        headerBackgroundColor="inherit"
        fields={state.fields.map((field) => ({
          name: field.simple_table_row.fieldName,
          label: field.simple_table_row.fieldLabel,
          sortFn: simpleTableSortFn,
          canColumnFilter: true,
          renderFn: EditableFieldCell,
        }))}
        data={state.rows.map(
          (row) =>
            ({
              id: row.id,
              ...row.simple_table_row,
            } as iSimpleTableRow)
        )}
      />
    </div>
  ) : (
    <>
      <div>Waiting for sheet data</div>
      <LoadRowsButton />
    </>
  );
}
