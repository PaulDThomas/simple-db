"use client";

import { SimpleTable, simpleTableSortFn } from "@asup/simple-table";
import { Button } from "flowbite-react";
import { useCallback, useContext, useEffect, useState } from "react";
import EditableCell from "../_components/EditableCell";
import { AppContext } from "../_context/AppContextProvider";
import { SET_FIELDS, UPDATE_FIELD_CELL } from "../_context/appContextReducer";
import { retrieveFields } from "../_functions/retreiveFields";
import { AddFieldButton } from "./AddFieldButton";
import { DeleteFieldButton } from "./DeleteFieldButton";
import { ImportDataButton } from "./ImportDataButton";
import { LoadFieldsButton } from "./LoadFieldsButton";
import { SaveFieldsButton } from "./SaveFieldsButton";

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
      <Button.Group>
        <LoadFieldsButton />
        <AddFieldButton />
        <SaveFieldsButton />
        <ImportDataButton />
      </Button.Group>
      <div>
        <SimpleTable
          headerLabel="Variable list"
          id="field-table"
          keyField={"id"}
          headerBackgroundColor="rgb(var(--background-start-rgb))"
          mainBackgroundColor="rgb(var(--background-start-rgb))"
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
      <div>
        <LoadFieldsButton />
      </div>
    </>
  );
}
