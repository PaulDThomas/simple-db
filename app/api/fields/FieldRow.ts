import { iSimpleTableRow } from "@asup/simple-table";

export interface field_simple_table_row extends iSimpleTableRow {
  worksheetFieldName: string;
  fieldLabel: string;
  fieldName: string;
}

export interface FieldRow {
  id: string;
  groupname: string;
  simple_table_row: field_simple_table_row;
}
