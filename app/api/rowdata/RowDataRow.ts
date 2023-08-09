"use client";
import { iSimpleTableRow } from "@asup/simple-table";

export interface RowDataRow extends iSimpleTableRow {
  id: string;
  simple_table_row: iSimpleTableRow;
  parent_id?: string;
  groupname: string;
  level_change?: number;
}
