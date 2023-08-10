import { iSimpleTableRow } from "@asup/simple-table";
import { WorkBook, read, utils } from "xlsx";
import { camelise } from "../../functions/camelise";
import { saveFields } from "./saveFields";
import { FieldRow, field_simple_table_row } from "../api/fields/FieldRow";

/**
 * Read in spreadsheet file
 * @param file File to read in
 * @returns WorkBook or null if unsuccessful
 */
export const saveWorkbook = async (
  file: File,
  callback: (wb: WorkBook) => Promise<void>
) => {
  const reader = new FileReader();
  reader.onloadend = async (event: ProgressEvent<FileReader>) => {
    if (event.target) {
      try {
        const arrayBuffer = event.target.result;
        const wb = read(arrayBuffer, { cellText: false, cellDates: true });
        callback(wb);
      } catch (error) {
        throw "error";
      }
    } else {
      throw "No target";
    }
  };
  reader.readAsArrayBuffer(file);
};
