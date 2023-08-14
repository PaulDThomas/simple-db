import { FieldRow } from "../api/fields/FieldRow";

export const addBlankField = (
  groupname: string,
  fields: FieldRow[]
): FieldRow[] => {
  const newIdNo =
    Math.max(
      0,
      ...fields
        .filter((field) => field.id.startsWith("00000000-aaaa-1111-bbbb-'"))
        .map((field) => parseInt(field.id.slice(-12)))
    ) + 1;
  const newVarNo = Math.max(0, ...fields.map((field) => field.grouporder)) + 1;
  const newField: FieldRow = {
    id: `00000000-aaaa-1111-bbbb-${("000000000000" + newIdNo).slice(-12)}`,
    groupname,
    grouporder: newVarNo,
    simple_table_row: {
      worksheetFieldName: "",
      fieldLabel: `New field ${newVarNo}`,
      fieldName: `newField${newVarNo}`,
      inBreadcrumb: false,
      inChild: false,
    },
  };
  return [newField, ...fields];
};
