"use client";

import { iSimpleTableCellRenderProps } from "@asup/simple-table";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { UPDATE_CELL } from "./_context/appContextReducer";

export default function EditableCell({
  cellField,
  rowData,
}: iSimpleTableCellRenderProps): JSX.Element {
  const { dispatch } = useContext(AppContext);

  const [currentValue, setCurrentValue] = useState<unknown>();
  useEffect(() => {
    // if (typeof rowData[cellField] === "string")
    setCurrentValue(rowData[cellField] as string);
  }, [rowData, cellField]);

  // Debounce update
  useEffect(() => {
    // if (typeof rowData[cellField] === "string") {
    const update = setTimeout(() => {
      if (currentValue !== rowData[cellField]) {
        dispatch({
          operation: UPDATE_CELL,
          rowId: rowData.id as string,
          fieldName: cellField,
          newValue: currentValue,
        });
      }
    }, 1000);
    return () => clearTimeout(update);
    // }
  }, [cellField, currentValue, dispatch, rowData]);

  if (currentValue instanceof Date) {
    const str = currentValue.toISOString().slice(0, 10);
    return (
      <input
        style={{ width: "calc(100% - 4px)" }}
        type="date"
        value={str}
        onChange={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setCurrentValue(new Date(e.currentTarget.value));
        }}
      />
    );
  } else if (typeof currentValue === "number") {
    return (
      <input
        style={{ width: "calc(100% - 4px)" }}
        type="number"
        value={currentValue}
        onChange={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setCurrentValue(e.currentTarget.value);
        }}
      />
    );
  } else {
    return (
      <input
        style={{ width: "calc(100% - 4px)" }}
        value={`${currentValue ?? ""}`}
        onChange={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setCurrentValue(e.currentTarget.value);
        }}
      />
    );
  }
}
