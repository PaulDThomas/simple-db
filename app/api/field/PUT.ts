import { NextRequest, NextResponse } from "next/server";
import conn from "../_functions/conn";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  // Check body
  if (request.json) {
    try {
      const inputJson = await request.json();
      if (inputJson.id && inputJson.fieldItem) {
        if (conn) {
          const result = await conn.query(
            "UPDATE fields SET settings = $1 WHERE id = $2",
            [inputJson.id, JSON.stringify(inputJson.fieldItem)]
          );
          if (result.rowCount > 0)
            return NextResponse.json(
              {
                message: `API/FIELD/PUT: Field updated`,
              },
              { status: 200 }
            );
          else
            return NextResponse.json(
              {
                message: `API/FIELD/PUT: Field not found`,
              },
              { status: 404 }
            );
        } else {
          return NextResponse.json(
            {
              message: "API/FIELD/PUT: No database connection",
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            message: "API/FIELD/PUT: id and fieldItem are required",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: `API/FIELD/PUT: Unknown error: ${error}`,
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: `API/FIELD/PUT: Missing json data`,
      },
      { status: 400 }
    );
  }
}
