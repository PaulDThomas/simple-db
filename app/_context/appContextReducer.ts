import { WorkBook } from "xlsx";
import { FieldRow } from "../api/fields/FieldRow";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { addBlankField } from "./addBlankField";
import { importRowData } from "./importRowData";
import { importFields } from "./importFields";

export const ADD_BLANK_FIELD = "ADD_BLANK_FIELD";
export const DELETE_FIELD = "DELETE_FIELD";
export const IMPORT_DATA = "IMPORT_DATA";
export const IMPORT_FIELDS = "IMPORT_FIELDS";
export const PROCESSING_COMPLETE = "PROCESSING_COMPLETE";
export const SET_FIELDS = "SET_FIELDS";
export const SET_ROWS = "SET_ROWS";
export const SET_WORKBOOK = "SET_WORKBOOK";
export const UPDATE_CELL = "UPDATE_CELL";
export const UPDATE_FIELD_CELL = "UPDATE_FIELD_CELL";

type Operation =
  | "ADD_BLANK_FIELD"
  | "DELETE_FIELD"
  | "IMPORT_DATA"
  | "IMPORT_FIELDS"
  | "PROCESSING_COMPLETE"
  | "SET_FIELDS"
  | "SET_ROWS"
  | "SET_WORKBOOK"
  | "UPDATE_CELL"
  | "UPDATE_FIELD_CELL";

export interface AppActionProps {
  operation: Operation;
  files?: FileList;
  groupName?: string;
  fields?: FieldRow[];
  rows?: RowDataRow[];
  workbook?: WorkBook | null;
  fieldName?: string;
  rowId?: string;
  newValue?: unknown;
}

export interface appState {
  name: string;
  processed: boolean;
  fields: FieldRow[] | null;
  rows: RowDataRow[] | null;
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
    case "ADD_BLANK_FIELD":
      if (action.groupName && newState.fields) {
        newState.fields = addBlankField(action.groupName, newState.fields);
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: Which group name are you adding to?`;
      }

    case "DELETE_FIELD":
      if (action.fieldName && newState.fields) {
        const ix = newState.fields.findIndex(
          (f) => f.simple_table_row.fieldName === action.fieldName
        );
        if (ix > -1) newState.fields.splice(ix, 1);
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What am I deleting?`;
      }
    case "IMPORT_DATA": {
      if (newState.fields && newState.workbook) {
        newState.rows = importRowData(
          newState.fields,
          newState.workbook.Sheets[newState.workbook.SheetNames[0]]
        );
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What are the import details?`;
      }
    }
    case "IMPORT_FIELDS": {
      if (newState.workbook && action.fieldName) {
        newState.fields = importFields(
          action.fieldName,
          newState.workbook.Sheets[newState.workbook.SheetNames[0]]
        );
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What am I importing this into?`;
      }
    }
    case "SET_FIELDS":
      if (action.fields) {
        newState.fields = action.fields;
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: Where are the fields?`;
      }
    case "SET_ROWS":
      if (action.rows) {
        newState.rows = action.rows;
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: Where are the rows?`;
      }
    case "SET_WORKBOOK":
      if (action.workbook) {
        newState.workbook = action.workbook;
        newState.fields = null;
        newState.rows = null;
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
          newRow.simple_table_row[action.fieldName] = action.newValue;
        }
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What am I updating?`;
      }
    case "UPDATE_FIELD_CELL":
      if (action.rowId && action.fieldName && newState.fields) {
        const newField = newState.fields.find((r) => r.id === action.rowId);
        if (newField) {
          if (action.fieldName === "groupName")
            newField.groupname = action.newValue as string;
          else if (action.fieldName === "order")
            newField.grouporder = action.newValue as number;
          else newField.simple_table_row[action.fieldName] = action.newValue;
        }
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What am I updating?`;
      }
  }
};

export default appContextReducer;
