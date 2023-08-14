import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { handleChange } from "./handleChange";
import { handleBlur } from "./handleBlur";

export const Control4Date = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <input
      style={{ width: "calc(100% - 4px)" }}
      type="date"
      disabled={ctx.operation === "NONE"}
      value={
        typeof ctx.currentValue === "string"
          ? ctx.currentValue.slice(0, 10)
          : ctx.currentValue instanceof Date
          ? ctx.currentValue.toISOString().slice(0, 10)
          : ""
      }
      onChange={(e) =>
        handleChange(
          e,
          e.currentTarget.value,
          ctx.toDoUpdate,
          ctx.timerVal,
          ctx.setCurrentValue
        )
      }
      onBlur={(e) =>
        handleBlur(
          e,
          e.currentTarget.value,
          ctx.toDoUpdate,
          ctx.timer,
          ctx.setCurrentValue,
          ctx.doUpdate
        )
      }
    />
  ) : (
    <></>
  );
};
