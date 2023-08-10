"use client";

import { iSimpleTableCellRenderProps } from "@asup/simple-table";
import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "./_context/AppContextProvider";

export default function EditableCell(
  { cellField, rowData }: iSimpleTableCellRenderProps,
  operation: "UPDATE_CELL" | "UPDATE_FIELD_CELL"
): JSX.Element {
  const { dispatch } = useContext(AppContext);

  const [currentValue, setCurrentValue] = useState<unknown>();
  useEffect(() => {
    setCurrentValue(rowData[cellField] as string);
  }, [rowData, cellField]);

  // Debounce update
  const timer = useRef<NodeJS.Timeout | null>(null);
  const doUpdate = useCallback(() => {
    console.log("Do update");
    dispatch({
      operation,
      rowId: rowData.id as string,
      fieldName: cellField,
      newValue: currentValue,
    });
  }, [cellField, currentValue, dispatch, rowData.id]);
  useEffect(() => {
    if (currentValue !== rowData[cellField])
      timer.current = setTimeout(doUpdate, 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [cellField, currentValue, doUpdate, rowData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    newValue: Date | number | string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentValue(newValue);
  };
  const handleBlur = (
    e: FocusEvent<HTMLInputElement>,
    newValue: Date | number | string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    setCurrentValue(newValue);
    doUpdate();
  };

  return (
    <div
      style={{
        paddingRight: "4px",
        backgroundColor:
          currentValue === rowData[cellField] ? "inherit" : "greenyellow",
      }}
    >
      {currentValue instanceof Date ||
      (typeof currentValue === "string" &&
        /^\d{4}-\d{2}-\d{2}/.test(currentValue)) ? (
        <input
          style={{ width: "calc(100% - 4px)" }}
          type="date"
          value={
            typeof currentValue === "string"
              ? currentValue.slice(0, 10)
              : currentValue.toISOString().slice(0, 10)
          }
          onChange={(e) => handleChange(e, e.currentTarget.value)}
          onBlur={(e) => handleBlur(e, e.currentTarget.value)}
        />
      ) : typeof currentValue === "number" ? (
        <input
          style={{ width: "calc(100% - 4px)" }}
          type="number"
          value={currentValue as number}
          onChange={(e) => handleChange(e, parseFloat(e.currentTarget.value))}
          onBlur={(e) => handleBlur(e, parseFloat(e.currentTarget.value))}
        />
      ) : (
        <input
          style={{ width: "calc(100% - 4px)" }}
          value={`${currentValue ?? ""}`}
          onChange={(e) => handleChange(e, e.currentTarget.value)}
          onBlur={(e) => handleBlur(e, e.target.value)}
        />
      )}
    </div>
  );
}
