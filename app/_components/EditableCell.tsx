"use client";

import { iSimpleTableCellRenderProps } from "@asup/simple-table";
import _ from "lodash";
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
  toDoUpdate: React.MutableRefObject<boolean>;
  timer: React.MutableRefObject<NodeJS.Timeout | null>;
  timerVal: React.MutableRefObject<number>;
  currentValue: unknown;
  setCurrentValue: (ret: unknown) => void;
  doUpdate: () => Promise<void>;
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

  // Debounce update
  const toDoUpdate = useRef<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const timerVal = useRef<number>(1000);
  const doUpdate = useCallback(async () => {
    if (operation === "PATCH_CELL") {
      await patchRowValue(rowData.id as string, cellField, currentValue);
    } else if (operation !== "NONE")
      dispatch({
        operation,
        rowId: rowData.id as string,
        fieldName: cellField,
        newValue: currentValue,
      });
  }, [cellField, currentValue, dispatch, operation, rowData.id]);
  // Update from either row or control
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

  return (
    <EditableCellContext.Provider
      value={{
        toDoUpdate,
        timer,
        timerVal,
        doUpdate,
        currentValue,
        setCurrentValue,
        operation,
      }}
    >
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
          <Control4Date />
        ) : forceType === "NUMBER" || typeof currentValue === "number" ? (
          <Control4Number />
        ) : forceType === "BOOLEAN" || typeof currentValue === "boolean" ? (
          <Control4Bool />
        ) : (
          <Control4String />
        )}
      </div>
    </EditableCellContext.Provider>
  );
}
