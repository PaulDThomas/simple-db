import { NextRequest, NextResponse } from "next/server";
import { run_query } from "./run_query";

export async function get_from_table(
  table: string,
  request: NextRequest
): Promise<NextResponse> {
  // Get parameters
  const { searchParams } = new URL(request.url);
  const sp: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    sp[key] = value;
  });
  // Run query
  if (sp["id"])
    return run_query(`SELECT * FROM ${table} WHERE id = $1`, [sp["id"]]);
  else if (sp["family_id"]) {
    return run_query(`SELECT * FROM ${table}_family($1, $2, $3)`, [
      sp["family_id"],
      sp["child_level"] ?? "null",
      sp["parent_level" ?? "null"],
    ]);
  } else if (sp["groupname"]) {
    return run_query(`SELECT * FROM ${table} WHERE groupname = $1`, [
      sp["groupname"],
    ]);
  } else if (sp["search"]) {
    return run_query(
      `SELECT * FROM ${table} WHERE jsonb_path_exists(simple_table_row, CONCAT('$.** ? (@.type() == "string" && @like_regex "',$1::text,'" flag "i")')::jsonpath)`,
      [sp["search"]]
    );
  } else {
    return run_query(`SELECT * FROM ${table}`, []);
  }
}
