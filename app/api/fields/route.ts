import { NextRequest } from "next/server";
import { delete_by_id } from "../_functions/delete_by_id";
import { get_from_table } from "../_functions/get_from_table";
import { patch_by_id } from "../_functions/patch_by_id";
import { post_rows_to_table } from "../_functions/post_rows_to_table";
import { put_into_table } from "../_functions/put_into_table";

export const DELETE = async (request: NextRequest) =>
  delete_by_id("fields", request);

export const GET = async (request: NextRequest) =>
  get_from_table("fields", request);

export const PATCH = async (request: NextRequest) =>
  patch_by_id("fields", "simple_table_row", request);

export const POST = async (request: NextRequest) =>
  post_rows_to_table("fields", request);

export const PUT = async (request: NextRequest) =>
  put_into_table("fields", request);
