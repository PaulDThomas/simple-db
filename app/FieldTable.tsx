"use client";

import {
  SimpleTable,
  iSimpleTableRow,
  simpleTableSortFn,
} from "@asup/simple-table";
import { useCallback, useContext, useEffect, useState } from "react";
import EditableFieldCell from "./EditableFieldCell";
import { AppContext } from "./_context/AppContextProvider";
import { retrieveFields } from "./_functions/retreiveFields";
import { FieldRow } from "./api/fields/FieldRow";
import { DELETE_FIELD, SET_FIELDS } from "./_context/appContextReducer";
import { DeleteFieldButton } from "./DeleteFieldButton";

interface WorkbookColumnsProps {
  groupName: string;
}

export default function FieldTable({ groupName }: WorkbookColumnsProps) {
  const { state, dispatch } = useContext(AppContext);
  // const [tableData, setTableData] = useState<fieldRow[] | null>(null);

  const newData = useCallback(async () => {
    const newData = await retrieveFields("TPV data agreements");
    dispatch({ operation: SET_FIELDS, fields: newData });
  }, [dispatch]);
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
      {/* <LoadFieldsButton groupName={groupName} />
      <SaveFieldsButton groupName={groupName} /> */}
      <SimpleTable
        headerLabel="Variable list"
        id="worksheet-columns"
        keyField={"id"}
        data={state.fields
          .filter((field) => (field.groupname = groupName))
          .map((field) => ({
            id: field.id,
            groupName: field.groupname,
            ...(field.simple_table_row as iSimpleTableRow),
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
            renderFn: EditableFieldCell,
          },
          {
            name: "fieldLabel",
            label: "Label",
            sortFn: simpleTableSortFn,
            canColumnFilter: true,
            renderFn: EditableFieldCell,
          },
          {
            name: "id",
            label: "Delete?",
            width: "20px",
            renderFn: DeleteFieldButton,
          },
        ]}
      />
    </div>
  ) : (
    <div>Waiting for sheet selection</div>
  );
}
