import { NextRequest, NextResponse } from "next/server";
import { run_query } from "./run_query";

interface tableRow {
  id: string;
  groupname: string;
  grouporder?: number;
  parent_id?: string;
  simple_table_row: object;
}

export async function post_rows_to_table(
  table: string,
  request: NextRequest,
  options?: {
    includeOrder?: boolean;
    includeParent?: boolean;
  }
): Promise<NextResponse> {
  const inputJson = await request.json();
  if (Array.isArray(inputJson.newRows)) {
    const newRows = inputJson.newRows as tableRow[];

    if (inputJson.deletePrevious) {
      const keepIds = newRows.map((newRow) => newRow.id);
      const keepVars = keepIds.map((_, i) => `$${i + 1}`);
      const delQuery = `DELETE FROM ${table} WHERE id not in (${keepVars.join(
        ","
      )})`;
      const delResult = await run_query(delQuery, keepIds);
    }

    let query = `INSERT INTO ${table} (id, groupname, simple_table_row`;
    if (options?.includeOrder) query += `, grouporder`;
    if (options?.includeParent) query += `, parent_id`;
    query += `) VALUES `;
    query += newRows
      .map(
        (newRow, i) =>
          `(CASE WHEN SUBSTR($${
            i * 3 + 1
          },1,23)='00000000-aaaa-1111-bbbb' THEN uuid_generate_v4() ELSE $${
            i * 3 + 1
          }::uuid END,$${i * 3 + 2},$${i * 3 + 3}${
            options?.includeOrder ? `,${newRow.grouporder ?? i + 1}` : ""
          }${
            options?.includeParent
              ? `,${newRow.parent_id ? `'${newRow.parent_id}'` : "null"}`
              : ""
          })`
      )
      .join(",");
    query +=
      " ON CONFLICT (id) DO UPDATE " +
      " SET groupname=EXCLUDED.groupname" +
      ", simple_table_row = EXCLUDED.simple_table_row";
    if (options?.includeOrder) query += ", grouporder=EXCLUDED.grouporder";
    if (options?.includeParent) query += ", parent_id=EXCLUDED.parent_id";
    query += ";";

    const queryParams = newRows.flatMap((newRow) => [
      newRow.id,
      newRow.groupname,
      JSON.stringify(newRow.simple_table_row),
    ]);
    const result = await run_query(query, queryParams);

    return NextResponse.json(
      {
        message: `API/${table}/POST: ${newRows.length} rows added`,
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
