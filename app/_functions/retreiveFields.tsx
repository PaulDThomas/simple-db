"use client";

import { FieldRow } from "../api/fields/FieldRow";

export const retrieveFields = async (fieldGroup: string) => {
  try {
    const url = `/api/fields?fieldGroup=${encodeURIComponent(fieldGroup)}`;
    const request = await fetch(url);
    const response = await request.json();
    console.groupCollapsed("Retrieved fields response");
    console.log(response);
    console.groupEnd();
    return response.rows as FieldRow[];
  } catch (error) {
    console.warn(error);
    return [];
  }
};
