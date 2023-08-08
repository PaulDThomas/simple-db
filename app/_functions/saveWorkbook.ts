import { iSimpleTableRow } from "@asup/simple-table";
import { WorkBook, read, utils } from "xlsx";
import { camelise } from "../../functions/camelise";
import { saveFields } from "./saveFields";
import { field_simple_table_row } from "../api/fields/FieldRow";

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
        [wb.SheetNames[0]].forEach(async (sn) => {
          const ws = (wb as WorkBook).Sheets[sn];
          const rows: iSimpleTableRow[] = utils.sheet_to_json(
            ws
          ) as iSimpleTableRow[];
          const fieldNames = new Set<string>();
          rows.forEach((obj) =>
            Object.keys(obj).forEach((k) => fieldNames.add(k))
          );

          const fields = [...fieldNames].map(
            (k) =>
              ({
                worksheetFieldName: k,
                fieldLabel: k.replace(/[^A-Z0-9]/gi, " ").replace(/\s+/g, " "),
                fieldName: camelise(k),
              } as field_simple_table_row)
          );

          await saveFields("TPV data agreements", fields);
        });
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
