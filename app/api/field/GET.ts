import { NextRequest, NextResponse } from "next/server";
import conn from "../_functions/conn";
import { QueryResult } from "pg";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const sp: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    sp[key] = value;
  });

  let result: QueryResult | null = null;
  if (conn) {
    if (sp["id"])
      result = await conn.query("SELECT * FROM fields WHERE id = $1", [
        sp["id"],
      ]);
    else if (sp["fieldGroup"]) {
      result = await conn.query("SELECT * FROM fields WHERE groupname = $1", [
        sp["fieldGroup"],
      ]);
    } else {
      result = await conn.query("SELECT * FROM fields");
    }
  }

  return NextResponse.json(result?.rows, { status: 200 });
}
