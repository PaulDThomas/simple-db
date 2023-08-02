import { iSimpleTableRow } from "@asup/simple-table";
import { WorkSheet, utils } from "xlsx";

export const getColumns = (worksheet: WorkSheet) => {
  const keys = new Set<string>();
  (utils.sheet_to_json(worksheet) as iSimpleTableRow[]).forEach((obj) =>
    Object.keys(obj).forEach((k) => keys.add(k))
  );
  return [...keys];
};
