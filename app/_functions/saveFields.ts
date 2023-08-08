import { field_simple_table_row } from "../api/fields/FieldRow";

export async function saveFields(
  groupName: string,
  fields: field_simple_table_row[]
) {
  try {
    const request = await fetch("/api/fields", {
      method: "POST",
      headers: { "Context-type": "application/json" },
      body: JSON.stringify({
        groupname: groupName,
        items: fields,
        deletePrevious: true,
      }),
    });
    const response = await request.json();
  } catch (error) {
    console.warn(error);
  }
}
