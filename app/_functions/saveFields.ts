import { FieldRow, field_simple_table_row } from "../api/fields/FieldRow";

export async function saveFields(newRows: FieldRow[]) {
  try {
    const request = await fetch("/api/fields", {
      method: "POST",
      headers: { "Context-type": "application/json" },
      body: JSON.stringify({
        newRows: newRows,
        deletePrevious: true,
      }),
    });
    const response = await request.json();
  } catch (error) {
    console.warn(error);
  }
}
