import { iSimpleTableField, iSimpleTableRow } from "@asup/simple-table";
import { WorkBook } from "xlsx";

export interface ImportField extends iSimpleTableRow {
  worksheetFieldName: string;
  fieldName: string;
  fieldLabel: string;
}

export interface ImportDetails {
  sheetName: string;
  rows: iSimpleTableRow[];
  fields: ImportField[];
}

export const DELETE_FIELD = "DELETE_FIELD";
export const IMPORT_DETAILS = "IMPORT_DETAILS";
export const PROCESSING_COMPLETE = "PROCESSING_COMPLETE";
export const SAVE_WORKBOOK = "SAVE_WORKBOOK";
export const UPDATE_CELL = "UPDATE_CELL";

type Operation =
  | "DELETE_FIELD"
  | "IMPORT_DETAILS"
  | "PROCESSING_COMPLETE"
  | "SAVE_WORKBOOK"
  | "UPDATE_CELL";

export interface AppActionProps {
  operation: Operation;
  files?: FileList;
  workbook?: WorkBook | null;
  importDetails?: ImportDetails[];
  rowId?: string;
  fieldName?: string;
  newValue?: unknown;
}

export interface appState {
  name: string;
  processed: boolean;
  workbook: WorkBook | null;
  importDetails: ImportDetails[];
  fields: ImportField[];
  rows: iSimpleTableRow[];
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
      if (action.fieldName) {
        const ix = newState.fields.findIndex(
          (f) => f.fieldName === action.fieldName
        );
        if (ix > -1) newState.fields.splice(ix, 1);
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What are the import details?`;
      }
    case "IMPORT_DETAILS":
      if (action.importDetails) {
        newState.importDetails = action.importDetails;
        newState.fields = action.importDetails[0].fields;
        newState.rows = action.importDetails[0].rows;
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What are the import details?`;
      }
    case "SAVE_WORKBOOK":
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
      if (action.rowId && action.fieldName) {
        const newRow = newState.rows.find((r) => r.id === action.rowId);
        if (newRow) {
          newRow[action.fieldName] = action.newValue;
        }
        return newState;
      } else {
        throw `APPCONTEXTREDUCER: ${action.operation}: What am I updating?`;
      }
  }
};

export default appContextReducer;
