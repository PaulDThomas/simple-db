import { NextRequest, NextResponse } from "next/server";
import { run_query } from "./run_query";

export async function patch_by_id(
  table: string,
  json_var: string,
  request: NextRequest
): Promise<NextResponse> {
  const inputJson = await request.json();
  if (inputJson.id && inputJson.field && inputJson.newValue !== undefined) {
    return run_query(
      `UPDATE ${table} 
      SET ${json_var} = 
        jsonb_set(${json_var}, 
          CONCAT('{',$2::text,'}')::text[], 
          $3::jsonb
        )
      WHERE id = $1::uuid`,
      [inputJson.id, inputJson.field, JSON.stringify(inputJson.newValue)]
    );
  } else {
    return NextResponse.json(
      {
        message: `API/${table}/PATCH: id, json_var and newValue are required`,
      },
      { status: 400 }
    );
  }
}
