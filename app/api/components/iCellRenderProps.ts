import { iSimpleTableCellRenderProps } from "@asup/simple-table";

export interface iCellRenderProps extends iSimpleTableCellRenderProps {
  operation: "UPDATE_CELL" | "UPDATE_FIELD_CELL";
  forceType?: "DATE" | "NUMBER" | "BOOLEAN";
}
