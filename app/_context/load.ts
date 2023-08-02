import { WorkBook, read, utils } from "xlsx";
import { ImportDetails, ImportField } from "./appContextReducer";
import { getColumns } from "./getColumns";
import { iSimpleTableRow } from "@asup/simple-table";
import { nanoid } from "nanoid";

function camelise(str: string) {
  return str
    .replace(/[^A-Z0-9]/gi, " ")
    .replace(/(\w+)/gi, (word, _, offset) => {
      return offset === 0
        ? word.toLowerCase()
        : `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .replace(/\s+/g, "");
}

/**
 * Read in spreadsheet file
 * @param file File to read in
 * @returns WorkBook or null if unsuccessful
 */
export const load = async (
  file: File,
  callback: (wb: WorkBook | null, sheetKeys?: ImportDetails[]) => Promise<void>
) => {
  let wb: WorkBook | null = null;
  let sheetKeys: ImportDetails[] | undefined = undefined;
  const reader = new FileReader();
  reader.onloadend = async (event: ProgressEvent<FileReader>) => {
    if (event.target) {
      try {
        const arrayBuffer = event.target.result;
        wb = read(arrayBuffer, { cellText: false, cellDates: true });
        sheetKeys = wb.SheetNames.map((sn) => {
          const ws = (wb as WorkBook).Sheets[sn];
          const rows: iSimpleTableRow[] = utils.sheet_to_json(ws).map((r) => ({
            id: nanoid(),
            ...(r as iSimpleTableRow),
          }));
          const fieldNames = new Set<string>();
          rows.forEach((obj) =>
            Object.keys(obj).forEach((k) => fieldNames.add(k))
          );
          return {
            sheetName: sn,
            rows,
            fields: [...fieldNames].map((k) => ({
              worksheetFieldName: k,
              fieldLabel: k.replace(/[^A-Z0-9]/gi, " ").replace(/\s+/g, " "),
              fieldName: camelise(k),
            })),
          };
        });
      } catch (error) {
        throw "error";
      }
    } else {
      throw "No target";
    }
    callback(wb, sheetKeys);
  };
  reader.readAsArrayBuffer(file);
};
