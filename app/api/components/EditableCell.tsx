"use client";

import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../_context/AppContextProvider";
import { iCellRenderProps } from "./iCellRenderProps";
import _ from "lodash";

export default function EditableCell({
  cellField,
  rowData,
  operation,
  forceType,
}: iCellRenderProps): JSX.Element {
  const { dispatch } = useContext(AppContext);

  const [currentValue, setCurrentValue] = useState<unknown>();

  // Debounce update
  const toDoUpdate = useRef<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const timerVal = useRef<number>(1000);
  const doUpdate = useCallback(() => {
    dispatch({
      operation,
      rowId: rowData.id as string,
      fieldName: cellField,
      newValue: currentValue,
    });
  }, [cellField, currentValue, dispatch, operation, rowData.id]);
  useEffect(() => {
    if (!_.isEqual(rowData[cellField], currentValue)) {
      // Update from interaction
      if (toDoUpdate.current) {
        timer.current = setTimeout(doUpdate, timerVal.current);
        toDoUpdate.current = false;
      }
      // Update from rowData
      else {
        setCurrentValue(rowData[cellField]);
      }
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [cellField, currentValue, doUpdate, rowData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    newValue: Date | number | string | boolean,
    thisTimer = 1000
  ) => {
    e.stopPropagation();
    e.preventDefault();
    toDoUpdate.current = true;
    timerVal.current = thisTimer;
    setCurrentValue(newValue);
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    newValue: Date | number | string | boolean
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    toDoUpdate.current = true;
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
      {forceType === "DATE" ||
      currentValue instanceof Date ||
      (typeof currentValue === "string" &&
        /^\d{4}-\d{2}-\d{2}/.test(currentValue)) ? (
        <input
          style={{ width: "calc(100% - 4px)" }}
          type="date"
          value={
            typeof currentValue === "string"
              ? currentValue.slice(0, 10)
              : currentValue instanceof Date
              ? currentValue.toISOString().slice(0, 10)
              : ""
          }
          onChange={(e) => handleChange(e, e.currentTarget.value)}
          onBlur={(e) => handleBlur(e, e.currentTarget.value)}
        />
      ) : forceType === "NUMBER" || typeof currentValue === "number" ? (
        <input
          style={{ width: "calc(100% - 4px)" }}
          type="number"
          value={
            typeof currentValue === "number" ? (currentValue as number) : ""
          }
          onChange={(e) => handleChange(e, parseFloat(e.currentTarget.value))}
          onBlur={(e) => handleBlur(e, parseFloat(e.currentTarget.value))}
        />
      ) : forceType === "BOOLEAN" || typeof currentValue === "boolean" ? (
        <input
          type="checkbox"
          checked={currentValue === true}
          onChange={(e) => handleChange(e, e.currentTarget.checked, 2)}
        />
      ) : (
        <input
          style={{ width: "calc(100% - 4px)" }}
          value={`${currentValue ?? ""}`}
          onChange={(e) => handleChange(e, e.currentTarget.value)}
          onBlur={(e) => handleBlur(e, e.currentTarget.value)}
        />
      )}
    </div>
  );
}
