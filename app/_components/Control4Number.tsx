import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { handleChange } from "./handleChange";
import { handleBlur } from "./handleBlur";

export const Control4Number = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <input
      style={{ width: "calc(100% - 4px)" }}
      type="number"
      disabled={ctx.operation === "NONE"}
      value={typeof ctx.currentValue === "number" ? ctx.currentValue : ""}
      onChange={(e) =>
        handleChange(
          e,
          parseFloat(e.currentTarget.value),
          ctx.toDoUpdate,
          ctx.timerVal,
          ctx.setCurrentValue
        )
      }
      onBlur={(e) =>
        handleBlur(
          e,
          parseFloat(e.currentTarget.value),
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
