import { NextRequest, NextResponse } from "next/server";
import conn from "./conn";
import { run_query } from "./run_query";

export async function put_into_table(
  table: string,
  request: NextRequest
): Promise<NextResponse> {
  const inputJson = await request.json();
  if (inputJson.id && inputJson.item) {
    return run_query(
      `UPDATE ${table} SET simple_table_row = $1 WHERE id = $2`,
      [inputJson.id, JSON.stringify(inputJson.item)]
    );
  } else {
    return NextResponse.json(
      {
        message: `API/${table}/PUT: id and item are required`,
      },
      { status: 400 }
    );
  }
}
