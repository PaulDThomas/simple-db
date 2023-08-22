"use client";

import { RowDataRow } from "../api/rowdata/RowDataRow";

export const retrieveRows = async (fieldGroup?: string) => {
  try {
    const url = `/api/rowdata${
      fieldGroup ? `?fieldGroup=${encodeURIComponent(fieldGroup)}` : ""
    }`;
    const request = await fetch(url);
    const response = await request.json();
    return (response.rows ?? []) as RowDataRow[];
  } catch (error) {
    console.warn(error);
    return [];
  }
};
