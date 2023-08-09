"use client";

import {
  SimpleTable,
  iSimpleTableRow,
  simpleTableSortFn,
} from "@asup/simple-table";
import { useCallback, useContext, useEffect } from "react";
import { DeleteFieldButton } from "./DeleteFieldButton";
import EditableFieldCell from "./EditableFieldCell";
import { LoadFieldsButton } from "./LoadFieldsButton";
import { SaveFieldsButton } from "./SaveFieldsButton";
import { AppContext } from "./_context/AppContextProvider";
import { SET_FIELDS } from "./_context/appContextReducer";
import { retrieveFields } from "./_functions/retreiveFields";
import { AddFieldButton } from "./AddFieldButton";

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
        height: "60vh",
      }}
    >
      <LoadFieldsButton groupName={groupName} />
      <AddFieldButton groupName={groupName} />
      <SaveFieldsButton groupName={groupName} />
      <SimpleTable
        headerLabel="Variable list"
        id="worksheet-columns"
        keyField={"id"}
        data={state.fields
          .filter((field) => (field.groupname = groupName))
          .map((field) => ({
            id: field.id,
            groupName: field.groupname,
            order: field.grouporder,
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
            name: "order",
            label: "Order",
            sortFn: simpleTableSortFn,
            renderFn: EditableFieldCell,
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
    <>
      <div>Waiting for sheet selection</div>
      <LoadFieldsButton groupName="TPV data agreements" />
    </>
  );
}
