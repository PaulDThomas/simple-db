import { iSimpleTableRow } from "@asup/simple-table";
import _ from "lodash";
import { WorkSheet, utils } from "xlsx";
import { FieldRow } from "../api/fields/FieldRow";
import { RowDataRow } from "../api/rowdata/RowDataRow";

export const importWorksheet = (
  fields: FieldRow[],
  worksheet: WorkSheet
): RowDataRow[] => {
  // Get input data
  const inputRows = utils.sheet_to_json(worksheet) as iSimpleTableRow[];

  // Set up holding objects
  const groupNames = new Set<string>(fields.map((field) => field.groupname));
  const groups: {
    groupName: string;
    rows: {
      id: string;
      simple_table_row: { [key: string]: unknown };
      parent_id?: string;
    }[];
  }[] = [];

  // Get each row's group values
  inputRows.forEach((ir) => {
    const newGroupValues = [...groupNames].map((groupName) => ({
      groupName,
      simple_table_row: fields
        .filter((field) => field.groupname === groupName)
        .sort((a, b) => a.grouporder - b.grouporder)
        .map((field) => ({
          key: field.simple_table_row.fieldName,
          value:
            typeof ir[field.simple_table_row.worksheetFieldName] === "string"
              ? (ir[field.simple_table_row.worksheetFieldName] as string).trim()
              : ir[field.simple_table_row.worksheetFieldName],
        }))
        .reduce(
          (obj: iSimpleTableRow, entry: { key: string; value: unknown }) => {
            obj[entry.key] = entry.value;
            return obj;
          },
          {} as iSimpleTableRow
        ),
    }));

    // Check each group against what is already there
    let parent_id: string | undefined = undefined;
    groupNames.forEach((groupName) => {
      const thisGroup = newGroupValues.find(
        (n) => n.groupName === groupName
      ) as { groupName: string; simple_table_row: iSimpleTableRow };
      const targetGroup = groups.find((g) => g.groupName === groupName);
      // Add first entry to target group
      if (!targetGroup) {
        const newGroup = {
          groupName,
          rows: [
            {
              id: crypto.randomUUID(),
              simple_table_row: { ...thisGroup.simple_table_row },
              parent_id,
            },
          ],
        };
        groups.push(newGroup);
        parent_id = newGroup.rows[0].id;
      } else {
        const thisGroupIx = targetGroup.rows.findIndex((r) =>
          _.isEqual(r.simple_table_row, thisGroup.simple_table_row)
        );
        if (thisGroupIx === -1) {
          const newId = crypto.randomUUID();
          targetGroup.rows.push({
            id: newId,
            simple_table_row: { ...thisGroup.simple_table_row },
            parent_id,
          });
          parent_id = newId;
        } else {
          parent_id = targetGroup.rows[thisGroupIx].id;
        }
      }
    });
  });
  const ret = groups.flatMap((g) =>
    g.rows.map((r) => ({ groupname: g.groupName, ...r }))
  );
  console.log(ret);
  return ret;
};
