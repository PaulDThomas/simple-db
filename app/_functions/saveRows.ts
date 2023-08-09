import { RowDataRow } from "../api/rowdata/RowDataRow";

export async function saveRows(newRows: RowDataRow[]) {
  try {
    const request = await fetch("/api/rowdata", {
      method: "POST",
      headers: { "Context-type": "application/json" },
      body: JSON.stringify({
        newRows: newRows,
        deletePrevious: true,
      }),
    });
    await request.json();
  } catch (error) {
    console.warn(error);
  }
}
