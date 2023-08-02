"use client";

import { SimpleTable, simpleTableSortFn } from "@asup/simple-table";
import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";

export default function WorkbookColumns() {
  const { state } = useContext(AppContext);

  return state.importDetails.length > 0 ? (
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
        keyField={"worksheetFieldName"}
        data={state.importDetails[0].fields}
        fields={[
          {
            name: "worksheetFieldName",
            label: "From worksheet",
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
          },
        ]}
      />
    </div>
  ) : (
    <div>Waiting for sheet selection</div>
  );
}
