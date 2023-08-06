import { NextRequest, NextResponse } from "next/server";
import { run_query } from "./run_query";

export async function delete_by_id(
  table: string,
  request: NextRequest
): Promise<NextResponse> {
  const inputJson = await request.json();
  if (inputJson.id) {
    return run_query(`DELETE ${table} WHERE id = $1`, [inputJson["id"]]);
  } else {
    return NextResponse.json(
      {
        message: `API/${table}/DELETE: id is required`,
      },
      { status: 400 }
    );
  }
}
