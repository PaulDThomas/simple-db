import { NextRequest, NextResponse } from "next/server";
import { run_query } from "./run_query";

export async function post_rows_to_table(
  table: string,
  request: NextRequest
): Promise<NextResponse> {
  const inputJson = await request.json();
  if (inputJson.groupname && Array.isArray(inputJson.items)) {
    if (inputJson.deletePrevious)
      await run_query(`DELETE FROM ${table} WHERE groupname = $1`, [
        inputJson.groupname,
      ]);
    const newFields = inputJson.items as unknown[];
    const query =
      `INSERT INTO ${table} (groupname, simple_table_row) VALUES ` +
      newFields.map((_, i) => `($${i * 2 + 1},$${(i + 1) * 2})`).join(",");
    const queryParams = newFields.flatMap((item) => [
      inputJson.groupname,
      JSON.stringify(item),
    ]);
    await run_query(query, queryParams);

    return NextResponse.json(
      {
        message: `API/${table}/POST: ${newFields.length} rows added`,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        message: `API/${table}/POST: groupname and items are required`,
      },
      { status: 400 }
    );
  }
}
