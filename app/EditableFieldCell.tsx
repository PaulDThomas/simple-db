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
  const timer = useRef<NodeJS.Timeout | null>(null);
  const doUpdate = useCallback(() => {
    console.log("Do update");
    dispatch({
      operation: UPDATE_FIELD_CELL,
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
      {currentValue instanceof Date ? (
        <input
          style={{ width: "calc(100% - 4px)" }}
          type="date"
          value={currentValue.toISOString().slice(0, 10)}
          onChange={(e) => handleChange(e, new Date(e.currentTarget.value))}
          onBlur={(e) => handleBlur(e, new Date(e.currentTarget.value))}
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
