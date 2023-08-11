import { iSimpleTableRow } from "@asup/simple-table";

export interface field_simple_table_row extends iSimpleTableRow {
  worksheetFieldName: string;
  fieldLabel: string;
  fieldName: string;
  inBreadcrumb: boolean;
  inChild: boolean;
}

export interface FieldRow {
  id: string;
  groupname: string;
  grouporder: number;
  simple_table_row: field_simple_table_row;
}
