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
    newFields.forEach(async (item) =>
      run_query(
        `INSERT INTO ${table} (groupname, simple_table_row) VALUES ($1, $2)`,
        [inputJson.fieldGroup, JSON.stringify(item)]
      )
    );

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
