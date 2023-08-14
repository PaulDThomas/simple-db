import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { handleChange } from "./handleChange";
import { handleBlur } from "./handleBlur";

export const Control4String = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <input
      style={{ width: "calc(100% - 4px)" }}
      disabled={ctx.operation === "NONE"}
      value={`${ctx.currentValue ?? ""}`}
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
