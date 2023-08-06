import { NextResponse } from "next/server";
import conn from "./conn";

export const run_query = async (
  query: string,
  params: string[]
): Promise<NextResponse> => {
  if (conn) {
    try {
      const result = await conn.query(query, params);
      return NextResponse.json(
        {
          message: `RUN_QUERY: Query successful`,
          ...result,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "RUN_QUERY: Error in query",
          error,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "RUN_QUERY: No database connection",
      },
      { status: 500 }
    );
  }
};
