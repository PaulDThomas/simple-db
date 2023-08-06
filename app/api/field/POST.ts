import { NextRequest, NextResponse } from "next/server";
import conn from "../_functions/conn";
import { ImportField } from "../../_context/appContextReducer";
import { Pool } from "pg";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Check body
  if (request.json) {
    try {
      const inputJson = await request.json();
      if (inputJson.fieldGroup && Array.isArray(inputJson.fieldItems)) {
        if (conn) {
          const newFields = inputJson.fieldItems as ImportField[];
          const values = newFields.map((f) => [inputJson.fieldGroup, f]);
          if (inputJson.deletePrevious)
            await conn.query("DELETE FROM fields WHERE groupname = $1", [
              inputJson.fieldGroup,
            ]);
          newFields.forEach(async (item) => {
            await (conn as Pool).query(
              `INSERT INTO fields (groupname, settings) VALUES ($1, $2)`,
              [inputJson.fieldGroup, JSON.stringify(item)]
            );
          });

          return NextResponse.json(
            {
              message: `API/FIELD/POST: ${values.length} rows added`,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              message: "API/FIELD/POST: No database connection",
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            message: "API/FIELD/POST: fieldGroup and fieldItems are required",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: `API/FIELD/POST: Unknown error: ${error}`,
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: `API/FIELD/POST: Missing json data`,
      },
      { status: 400 }
    );
  }
}
