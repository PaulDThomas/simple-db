"use client";

import { iSimpleTableCellRenderProps } from "@asup/simple-table";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { UPDATE_FIELD_CELL } from "./_context/appContextReducer";

export default function EditableFieldCell({
  cellField,
  rowData,
}: iSimpleTableCellRenderProps): JSX.Element {
  const { dispatch } = useContext(AppContext);

  const [currentValue, setCurrentValue] = useState<unknown>();
  useEffect(() => {
    setCurrentValue(rowData[cellField] as string);
  }, [rowData, cellField]);

  // Debounce update
  useEffect(() => {
    const update = setTimeout(() => {
      if (currentValue !== rowData[cellField]) {
        dispatch({
          operation: UPDATE_FIELD_CELL,
          rowId: rowData.id as string,
          fieldName: cellField,
          newValue: currentValue,
        });
      }
    }, 1000);
    return () => clearTimeout(update);
  }, [cellField, currentValue, dispatch, rowData]);

  return (
    <div
      style={{
        paddingRight: "4px",
        backgroundColor:
          currentValue === rowData[cellField] ? "inherit" : "greenyellow",
      }}
    >
      {currentValue instanceof Date ? (
        <input
          style={{ width: "calc(100% - 4px)" }}
          type="date"
          value={currentValue.toISOString().slice(0, 10)}
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setCurrentValue(new Date(e.currentTarget.value));
          }}
        />
      ) : typeof currentValue === "number" ? (
        <input
          style={{ width: "calc(100% - 4px)" }}
          type="number"
          value={currentValue as number}
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setCurrentValue(parseFloat(e.currentTarget.value));
          }}
        />
      ) : (
        <input
          style={{ width: "calc(100% - 4px)" }}
          value={`${currentValue ?? ""}`}
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setCurrentValue(e.currentTarget.value);
          }}
        />
      )}
    </div>
  );
}
