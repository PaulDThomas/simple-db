import { RowDataRow } from "../api/rowdata/RowDataRow";

export async function saveRows(newRows: RowDataRow[], deletePrevious = true) {
  try {
    const request = await fetch("/api/rowdata", {
      method: "POST",
      headers: { "Context-type": "application/json" },
      body: JSON.stringify({
        newRows: newRows,
        deletePrevious,
      }),
    });
    const ret = await request.json();
    return ret;
  } catch (error) {
    console.warn(error);
  }
}
