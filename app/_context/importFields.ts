import { WorkSheet, utils } from "xlsx";
import { FieldRow, field_simple_table_row } from "../api/fields/FieldRow";
import { iSimpleTableRow } from "@asup/simple-table";
import { camelise } from "../../functions/camelise";
import { saveFields } from "../_functions/saveFields";

export const importFields = (
  groupName: string,
  workSheet: WorkSheet
): FieldRow[] => {
  const rows: iSimpleTableRow[] = utils.sheet_to_json(
    workSheet
  ) as iSimpleTableRow[];
  const fieldNames = new Set<string>();
  rows.forEach((obj) => Object.keys(obj).forEach((k) => fieldNames.add(k)));

  const fields: FieldRow[] = [...fieldNames].map((k, i) => ({
    id: "00000000-aaaa-1111-bbbb-" + ("000000000000" + i).slice(-12),
    grouporder: i + 1,
    groupname: groupName,
    simple_table_row: {
      worksheetFieldName: k,
      fieldLabel: k.replace(/[^A-Z0-9]/gi, " ").replace(/\s+/g, " "),
      fieldName: camelise(k),
    } as field_simple_table_row,
  }));
  return fields;
};
