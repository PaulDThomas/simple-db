"use client";

import { FieldRow } from "../api/fields/FieldRow";

export const retrieveFields = async (fieldGroup?: string) => {
  try {
    const url = `/api/fields${
      fieldGroup ? `?fieldGroup=${encodeURIComponent(fieldGroup)}` : ""
    }`;
    const request = await fetch(url);
    const response = await request.json();
    return (response.rows ?? []) as FieldRow[];
  } catch (error) {
    console.warn(error);
    return [];
  }
};
