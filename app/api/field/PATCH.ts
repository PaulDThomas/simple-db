import { NextRequest, NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  // Check body
  if (request.json) {
    try {
      const inputJson = await request.json();
      if (
        inputJson.id &&
        inputJson.setting &&
        inputJson.newValue !== undefined
      ) {
        if (conn) {
          const result = await conn.query(
            "UPDATE fields SET settings = jsonb_set(settings, '{$2}', $3) WHERE id = $1",
            [
              inputJson.id,
              inputJson.setting,
              JSON.stringify(inputJson.newValue),
            ]
          );
          if (result.rowCount > 0)
            return NextResponse.json(
              {
                message: `API/FIELD/PATCH: Field updated`,
              },
              { status: 200 }
            );
          else
            return NextResponse.json(
              {
                message: `API/FIELD/PATCH: Field not found`,
              },
              { status: 404 }
            );
        } else {
          return NextResponse.json(
            {
              message: "API/FIELD/PATCH: No database connection",
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            message: "API/FIELD/PATCH: id, setting and newValue are required",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: `API/FIELD/PATCH: Unknown error: ${error}`,
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: `API/FIELD/PATCH: Missing json data`,
      },
      { status: 400 }
    );
  }
}
