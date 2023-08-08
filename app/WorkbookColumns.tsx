"use client";

import {
  SimpleTable,
  iSimpleTableRow,
  simpleTableSortFn,
} from "@asup/simple-table";
import { useCallback, useContext, useEffect, useState } from "react";
import EditableCell from "./EditableCell";
import { AppContext } from "./_context/AppContextProvider";
import { retrieveFields } from "./_functions/retreiveFields";
import { FieldRow } from "./api/fields/FieldRow";
import { DELETE_FIELD, SET_FIELDS } from "./_context/appContextReducer";

export default function WorkbookColumns() {
  const { state, dispatch } = useContext(AppContext);
  // const [tableData, setTableData] = useState<fieldRow[] | null>(null);

  const newData = useCallback(async () => {
    console.log(`Checking for new data: ${state.processed}`);
    const newData = await retrieveFields("TPV data agreements");
    dispatch({ operation: SET_FIELDS, fields: newData });
    // setTableData(newData);
  }, [dispatch, state.processed]);
  useEffect(() => {
    if (state.processed && state.fields === null) {
      newData();
    }
  }, [newData, state.processed, state.fields]);

  return state.fields && state.fields.length > 0 ? (
    <div
      style={{
        width: "90vw",
        minHeight: "200px",
        height: "30vh",
      }}
    >
      <SimpleTable
        headerLabel="Variable list"
        id="worksheet-columns"
        keyField={"id"}
        data={state.fields.map((i) => ({
          id: i.id,
          groupName: i.groupname,
          ...(i.simple_table_row as iSimpleTableRow),
        }))}
        fields={[
          {
            name: "groupName",
            label: "Group name",
            sortFn: simpleTableSortFn,
            canColumnFilter: true,
          },
          {
            name: "fieldName",
            label: "Name",
            sortFn: simpleTableSortFn,
            canColumnFilter: true,
          },
          {
            name: "fieldLabel",
            label: "Label",
            sortFn: simpleTableSortFn,
            canColumnFilter: true,
            renderFn: EditableCell,
          },
          {
            name: "id",
            label: "Delete?",
            width: "20px",
            renderFn: ({ rowData }) => (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log(`Delete ${rowData.id}`);
                  await fetch("/api/fields", {
                    method: "DELETE",
                    headers: { "Context-type": "application/json" },
                    body: JSON.stringify(rowData),
                  });
                  console.log("DELETED");
                  dispatch({
                    operation: DELETE_FIELD,
                    fieldName: rowData.fieldName as string,
                  });
                }}
              >
                x {(rowData.id as string).slice(0, 4)}
              </button>
            ),
          },
        ]}
      />
    </div>
  ) : (
    <div>Waiting for sheet selection</div>
  );
}
