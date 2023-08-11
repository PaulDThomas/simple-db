"use client";

import {
  SimpleTable,
  iSimpleTableRow,
  simpleTableSortFn,
} from "@asup/simple-table";
import { useCallback, useContext, useEffect } from "react";
import { AddFieldButton } from "./AddFieldButton";
import EditableCell from "../_components/EditableCell";
import { ImportDataButton } from "./ImportDataButton";
import { LoadFieldsButton } from "./LoadFieldsButton";
import { SaveFieldsButton } from "./SaveFieldsButton";
import { AppContext } from "../_context/AppContextProvider";
import { SET_FIELDS, UPDATE_FIELD_CELL } from "../_context/appContextReducer";
import { retrieveFields } from "../_functions/retreiveFields";
import { DeleteFieldButton } from "./DeleteFieldButton";

export default function FieldTable() {
  const { state, dispatch } = useContext(AppContext);

  const newData = useCallback(async () => {
    const newData = await retrieveFields();
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
      }}
    >
      <LoadFieldsButton />
      <AddFieldButton />
      <SaveFieldsButton />
      <ImportDataButton />
      <div style={{ minHeight: "150px" }}>
        <SimpleTable
          headerLabel="Variable list"
          id="field-table"
          keyField={"id"}
          data={state.fields
            .sort((a, b) => a.grouporder - b.grouporder)
            .map((field) => ({
              id: field.id,
              groupName: field.groupname,
              order: field.grouporder,
              fieldName: field.simple_table_row.fieldName,
              fieldLabel: field.simple_table_row.fieldLabel,
              inBreadcrumb: field.simple_table_row.inBreadcrumb,
              inChild: field.simple_table_row.inChild,
            }))}
          fields={[
            {
              name: "id",
              label: "Delete?",
              width: "20px",
              renderFn: DeleteFieldButton,
            },
            {
              name: "groupName",
              label: "Group name",
              sortFn: simpleTableSortFn,
              canColumnFilter: true,
              renderFn: (a) =>
                EditableCell({ ...a, operation: UPDATE_FIELD_CELL }),
            },
            {
              name: "order",
              label: "Order",
              sortFn: simpleTableSortFn,
              renderFn: (a) =>
                EditableCell({ ...a, operation: UPDATE_FIELD_CELL }),
            },
            {
              name: "fieldName",
              label: "Name",
              sortFn: simpleTableSortFn,
              canColumnFilter: true,
              renderFn: (a) =>
                EditableCell({ ...a, operation: UPDATE_FIELD_CELL }),
            },
            {
              name: "fieldLabel",
              label: "Label",
              sortFn: simpleTableSortFn,
              canColumnFilter: true,
              renderFn: (a) =>
                EditableCell({ ...a, operation: UPDATE_FIELD_CELL }),
            },
            {
              name: "inBreadcrumb",
              label: "Breadcrumb",
              canColumnFilter: true,
              renderFn: (a) =>
                EditableCell({
                  ...a,
                  operation: UPDATE_FIELD_CELL,
                  forceType: "BOOLEAN",
                }),
            },
            {
              name: "inChild",
              label: "Child",
              canColumnFilter: true,
              renderFn: (a) =>
                EditableCell({
                  ...a,
                  operation: UPDATE_FIELD_CELL,
                  forceType: "BOOLEAN",
                }),
            },
          ]}
        />
      </div>
    </div>
  ) : (
    <>
      <div>Waiting for sheet selection</div>
      <LoadFieldsButton />
    </>
  );
}
