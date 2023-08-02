import { iSimpleTableField, iSimpleTableRow } from "@asup/simple-table";
import { load } from "./load";
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

export const LOAD = "LOAD";
export const LOAD_WORKBOOK = "LOAD_WORKBOOK";
export const IMPORT_DETAILS = "IMPORT_DETAILS";
export const UPDATE_CELL = "UPDATE_CELL";

type Operation = "IMPORT_DETAILS" | "LOAD" | "LOAD_WORKBOOK" | "UPDATE_CELL";

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
    case "IMPORT_DETAILS":
      if (action.importDetails) {
        newState.importDetails = action.importDetails;
        newState.fields = action.importDetails[0].fields;
        newState.rows = action.importDetails[0].rows;
        return newState;
      } else {
        throw "What are the import details??";
      }
    case "LOAD":
      if (action.files && action.files.length === 1) {
        const file = action.files[0];
        load(file, async (ret) => {
          newState.workbook = ret;
        });
        return newState;
      } else {
        throw "Where is the file?";
      }
    case "LOAD_WORKBOOK":
      if (action.workbook) {
        newState.workbook = action.workbook;
        return newState;
      } else {
        throw "Where is the workbook?";
      }
    case "UPDATE_CELL":
      if (action.rowId && action.fieldName) {
        const newRow = newState.rows.find((r) => r.id === action.rowId);
        if (newRow) {
          newRow[action.fieldName] = action.newValue;
        }
        return newState;
      } else {
        throw "What am I updating?";
      }
  }
};

export default appContextReducer;
