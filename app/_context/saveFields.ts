import { field_simple_table_row } from "../api/fields/FieldRow";

export async function saveFields(fields: field_simple_table_row[]) {
  try {
    const request = await fetch("/api/fields", {
      method: "POST",
      headers: { "Context-type": "application/json" },
      body: JSON.stringify({
        groupname: "TPV data agreements",
        items: fields,
        deletePrevious: true,
      }),
    });
    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.warn(error);
  }
}
