import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { handleChange } from "./handleChange";
import { handleBlur } from "./handleBlur";
import { TextInput } from "flowbite-react";

export const Control4Number = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <TextInput
      type="number"
      disabled={ctx.operation === "NONE"}
      sizing="sm"
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
