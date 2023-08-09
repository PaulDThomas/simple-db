import { WorkSheet, utils } from "xlsx";
import { FieldRow } from "../api/fields/FieldRow";
import { RowDataRow } from "../api/rowdata/RowDataRow";

// const mapFieldToRow = (fields: FieldRow[], row: iSimpleTableRow, rowNumber: number): RowDataRow[] => {
//   const

//   const outRow = Object.keys(row).map((k,i) => {
//     const f = fields.find(field => field.simple_table_row.worksheetFieldName === k);
//     if (f) {
//       return {
//         id: "00000000-aaaa-1111-bbbb-" + ("000000000000" + i).slice(-12),

//       }

//     }
//     else {
//       return {
//         id: 'remove',
//         simple_table_row: {},
//         groupname: '',
//       }
//     }
//   });
//   return outRow;
// }

export const importWorksheet = (
  fields: FieldRow[],
  worksheet: WorkSheet
): RowDataRow[] => {
  const inputRows = utils.sheet_to_json(worksheet);

  const groupNames = new Set<string>(fields.map((field) => field.groupname));
  const groups: {
    groupName: string;
    id: string;
    simple_table_row: Set<{ [key: string]: unknown }>;
    parent_id?: string;
  }[] = [];

  inputRows.forEach((ir) => {
    console.log(ir);
  });

  return [];
  // return
  //   .flatMap((row,i) => mapFieldToRow(fields, row as iSimpleTableRow,i))
  //   .filter(row => row.id = 'remove');
};
