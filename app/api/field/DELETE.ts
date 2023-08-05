import { NextRequest, NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  // Check body
  if (request.json) {
    try {
      const inputJson = await request.json();
      if (inputJson.id) {
        if (conn) {
          const result = await conn.query("DELETE fields WHERE id = $1", [
            inputJson.id,
          ]);
          if (result.rowCount > 0)
            return NextResponse.json(
              {
                message: `API/FIELD/DELETE: Field deleted`,
              },
              { status: 200 }
            );
          else
            return NextResponse.json(
              {
                message: `API/FIELD/DELETE: Field not found`,
              },
              { status: 404 }
            );
        } else {
          return NextResponse.json(
            {
              message: "API/FIELD/DELETE: No database connection",
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            message: "API/FIELD/DELETE: id is required",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: `API/FIELD/DELETE: Unknown error: ${error}`,
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: `API/FIELD/DELETE: Missing json data`,
      },
      { status: 400 }
    );
  }
}
