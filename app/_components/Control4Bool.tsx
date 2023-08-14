import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { handleChange } from "./handleChange";

export const Control4Bool = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <input
      type="check"
      disabled={ctx.operation === "NONE"}
      checked={ctx.currentValue === true}
      onChange={(e) =>
        handleChange(
          e,
          e.currentTarget.checked,
          ctx.toDoUpdate,
          ctx.timerVal,
          ctx.setCurrentValue,
          2
        )
      }
    />
  ) : (
    <></>
  );
};
