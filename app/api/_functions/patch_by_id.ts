import { NextRequest, NextResponse } from "next/server";
import { run_query } from "./run_query";

export async function patch_by_id(
  table: string,
  json_var: string,
  request: NextRequest
): Promise<NextResponse> {
  const inputJson = await request.json();
  if (inputJson.id && inputJson.setting && inputJson.newValue !== undefined) {
    return run_query(
      `UPDATE ${table} SET ${json_var} = jsonb_set(settings, '{$2}', $3) WHERE id = $1`,
      [inputJson.id, inputJson.setting, JSON.stringify(inputJson.newValue)]
    );
  } else {
    return NextResponse.json(
      {
        message: `API/${table}/PATCH: id, setting and newValue are required`,
      },
      { status: 400 }
    );
  }
}
