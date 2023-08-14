export async function patchRowValue(
  id: string,
  field: string,
  newValue: unknown
) {
  try {
    const request = await fetch("/api/rowdata", {
      method: "PATCH",
      headers: { "Context-type": "application/json" },
      body: JSON.stringify({
        id,
        field,
        newValue,
      }),
    });
    return await request.json();
  } catch (error) {
    console.warn(error);
  }
}
