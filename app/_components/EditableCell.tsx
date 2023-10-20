"use client";

import { iSimpleTableCellRenderProps } from "@asup/simple-table";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../_context/AppContextProvider";
import { patchRowValue } from "../_functions/patchRowValue";
import { Control4Bool } from "./Control4Bool";
import { Control4Date } from "./Control4Date";
import { Control4Number } from "./Control4Number";
import { Control4String } from "./Control4String";

interface EditableCellContextProps {
  currentValue: unknown;
  debounceChange: (ret: unknown) => void;
  immediateChange: (ret: unknown) => void;
  operation: "NONE" | "UPDATE_CELL" | "UPDATE_FIELD_CELL" | "PATCH_CELL";
}

export const EditableCellContext =
  createContext<EditableCellContextProps | null>(null);

interface iCellRenderProps extends iSimpleTableCellRenderProps {
  operation: "NONE" | "UPDATE_CELL" | "UPDATE_FIELD_CELL" | "PATCH_CELL";
  forceType?: "DATE" | "NUMBER" | "BOOLEAN";
}

export default function EditableCell({
  cellField,
  rowData,
  operation,
  forceType,
}: iCellRenderProps): JSX.Element {
  const { dispatch } = useContext(AppContext);

  const [currentValue, setCurrentValue] = useState<unknown>();
  const [debouncedValue, setDebouncedValue] = useState<unknown>();
  const debounceController = useRef<AbortController | null>(null);
  useEffect(() => {
    if (debounceController.current) {
      debounceController.current.abort();
    }
    setCurrentValue(rowData[cellField]);
    setDebouncedValue(rowData[cellField]);
  }, [cellField, rowData]);

  // Update value from debouncedValue
  const value = rowData[cellField];
  const setValue = useCallback(
    async (newValue: unknown) => {
      if (operation === "PATCH_CELL") {
        await patchRowValue(rowData.id as string, cellField, newValue);
      } else if (operation !== "NONE")
        dispatch({
          operation,
          rowId: rowData.id as string,
          fieldName: cellField,
          newValue,
        });
    },
    [cellField, dispatch, operation, rowData.id]
  );
  useEffect(() => {
    if (
      operation !== "NONE" &&
      debouncedValue !== value &&
      debounceController.current &&
      !debounceController.current?.signal.aborted
    ) {
      setValue(debouncedValue);
    }
  }, [debouncedValue, operation, setValue, value]);

  // Update debounce from current
  useEffect(() => {
    if (currentValue !== debouncedValue) {
      if (debounceController.current) debounceController.current.abort();
      debounceController.current = new AbortController();

      const timer = setTimeout(() => {
        if (!debounceController.current?.signal.aborted) {
          setDebouncedValue(currentValue);
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentValue, debouncedValue]);

  return (
    <EditableCellContext.Provider
      value={{
        currentValue,
        debounceChange: (ret) => {
          if (debounceController.current) {
            debounceController.current.abort();
          }
          setCurrentValue(ret);
        },
        immediateChange: (ret) => {
          if (debounceController.current) {
            debounceController.current.abort();
          }
          setCurrentValue(ret);
          setDebouncedValue(ret);
          if (ret !== value) setValue(ret);
        },
        operation,
      }}
    >
      {forceType === "DATE" ||
      currentValue instanceof Date ||
      (typeof currentValue === "string" &&
        /^\d{4}-\d{2}-\d{2}/.test(currentValue)) ? (
        <Control4Date />
      ) : forceType === "NUMBER" || typeof currentValue === "number" ? (
        <Control4Number />
      ) : forceType === "BOOLEAN" || typeof currentValue === "boolean" ? (
        <Control4Bool />
      ) : (
        <Control4String />
      )}
    </EditableCellContext.Provider>
  );
}
