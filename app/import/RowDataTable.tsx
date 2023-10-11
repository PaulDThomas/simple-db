"use client";

import {
  SimpleTable,
  iSimpleTableCellRenderProps,
  iSimpleTableRow,
  simpleTableSortFn,
} from "@asup/simple-table";
import Link from "next/link";
import { useContext } from "react";
import EditableCell from "../_components/EditableCell";
import { LoadRowsButton } from "./LoadRowsButton";
import { SaveRowsButton } from "./SaveRowsButton";
import { AppContext } from "../_context/AppContextProvider";
import { UPDATE_CELL } from "../_context/appContextReducer";

export default function RowDataTable() {
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
        id="rowdata-table"
        keyField="id"
        mainBackgroundColor="inherit"
        fields={[
          {
            name: "id",
            label: "ID",
            renderFn: ({ rowData }) => {
              return (
                <Link href={`/datanav?id=${rowData.id}`} target="_blank">
                  {rowData.id as string}
                </Link>
              );
            },
          },
          ...state.fields.map((field) => ({
            name: field.simple_table_row.fieldName,
            label: field.simple_table_row.fieldLabel,
            sortFn: simpleTableSortFn,
            canColumnFilter: true,
            renderFn: (a: iSimpleTableCellRenderProps) =>
              EditableCell({ ...a, operation: UPDATE_CELL }),
          })),
        ]}
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
