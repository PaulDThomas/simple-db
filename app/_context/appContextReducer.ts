import { iSimpleTableField, iSimpleTableRow } from "@asup/simple-table";
import { WorkBook } from "xlsx";
import { FieldRow } from "../api/fields/FieldRow";

export const DELETE_FIELD = "DELETE_FIELD";
export const IMPORT_DETAILS = "IMPORT_DETAILS";
export const PROCESSING_COMPLETE = "PROCESSING_COMPLETE";
export const SET_WORKBOOK = "SET_WORKBOOK";
export const SET_FIELDS = "SET_FIELDS";
export const UPDATE_CELL = "UPDATE_CELL";
export const UPDATE_FIELD_CELL = "UPDATE_FIELD_CELL";

type Operation =
  | "DELETE_FIELD"
  | "PROCESSING_COMPLETE"
  | "SET_FIELDS"
  | "SET_WORKBOOK"
  | "UPDATE_CELL"
  | "UPDATE_FIELD_CELL";

export interface AppActionProps {
  operation: Operation;
  files?: FileList;
  workbook?: WorkBook | null;
  rowId?: string;
  fields?: FieldRow[];
  fieldName?: string;
  newValue?: unknown;
}

export interface appState {
  name: string;
  processed: boolean;
  fields: FieldRow[] | null;
  rows: iSimpleTableRow[] | null;
  workbook: WorkBook | null;
}

export const appContextReducer = (
  state: appState,
  action: AppActionProps
): appState => {
  const newState = {
    ...state,
  };
  switch (action.operation) {
    case "DELETE_FIELD":
      if (action.fieldName && newState.fields) {
        const ix = newState.fields.findIndex(
          (f) => f.simple_table_row.fieldName === action.fieldName
        );
        if (ix > -1) newState.fields.splice(ix, 1);
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What are the import details?`;
      }
    case "SET_FIELDS":
      if (action.fields) {
        newState.fields = action.fields;
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: Where is the workbook?`;
      }
    case "SET_WORKBOOK":
      if (action.workbook) {
        newState.workbook = action.workbook;
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: Where is the workbook?`;
      }
    case "PROCESSING_COMPLETE":
      newState.processed = true;
      return newState;
    case "UPDATE_CELL":
      if (action.rowId && action.fieldName && newState.rows) {
        const newRow = newState.rows.find((r) => r.id === action.rowId);
        if (newRow) {
          newRow[action.fieldName] = action.newValue;
        }
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What am I updating?`;
      }
    case "UPDATE_FIELD_CELL":
      if (action.rowId && action.fieldName && newState.fields) {
        const newField = newState.fields.find((r) => r.id === action.rowId);
        if (newField) {
          newField.simple_table_row[action.fieldName] = action.newValue;
        }
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What am I updating?`;
      }
  }
};

export default appContextReducer;
