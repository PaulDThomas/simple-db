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
import { Button } from "flowbite-react";

export default function RowDataTable() {
  const { state } = useContext(AppContext);
  const fields = state.fields;
  const rows = state.rows;
  return fields && rows && fields.length > 0 ? (
    <div className="w-full mt-2">
      <Button.Group className="mb-3">
        <LoadRowsButton />
        <SaveRowsButton />
      </Button.Group>
      <div>
        {rows
          .map((r) => r.simple_table_row.studyName)
          .filter((s) => s !== undefined)
          .join(", ")}
      </div>
      <SimpleTable
        headerLabel={`Data from ${
          state.workbook?.SheetNames[0] ?? "some spreadhseet"
        }`}
        id="rowdata-table"
        keyField="id"
        mainBackgroundColor="inherit"
        headerBackgroundColor="rgb(var(--background-start-rgb))"
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
          ...fields.map((field) => ({
            name: field.simple_table_row.fieldName,
            label: field.simple_table_row.fieldLabel,
            sortFn: simpleTableSortFn,
            canColumnFilter: true,
            renderFn: (a: iSimpleTableCellRenderProps) =>
              EditableCell({ ...a, operation: UPDATE_CELL }),
          })),
        ]}
        data={rows.map(
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
      <LoadRowsButton />
    </>
  );
}
