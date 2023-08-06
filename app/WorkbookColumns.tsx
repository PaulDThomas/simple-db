"use client";

import { SimpleTable, iSimpleTableRow } from "@asup/simple-table";
import { useCallback, useContext, useEffect, useState } from "react";
import EditableCell from "./EditableCell";
import { AppContext } from "./_context/AppContextProvider";

const getColumnData = async () => {
  try {
    const request = await fetch(
      "/api/fields?fieldGroup=TPV%20data%20agreements"
    );
    const response = await request.json();
    return response;
  } catch (error) {
    console.warn(error);
  }
};

export default function WorkbookColumns() {
  const { state } = useContext(AppContext);
  const [tableData, setTableData] = useState<iSimpleTableRow[]>([]);

  const newData = useCallback(async () => {
    if (state.processed) {
      const newData = await getColumnData();
      console.log(newData);
      setTableData(newData.rows);
    }
  }, [state.processed]);
  useEffect(() => {
    newData();
  }, [newData]);

  return (tableData?.length ?? 0) > 0 ? (
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
        data={tableData.map((i) => ({
          id: i.id,
          groupName: i.groupname,
          ...(i.simple_table_row as iSimpleTableRow),
        }))}
        fields={[
          {
            name: "groupName",
            label: "Group name",
            // sortFn: simpleTableSortFn,
            canColumnFilter: true,
          },
          {
            name: "fieldName",
            label: "Name",
            // sortFn: simpleTableSortFn,
            canColumnFilter: true,
          },
          {
            name: "fieldLabel",
            label: "Label",
            // sortFn: simpleTableSortFn,
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
