import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { handleChange } from "./handleChange";
import { Checkbox } from "flowbite-react";

export const Control4Bool = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <div className="w-full flex justify-center">
      <Checkbox
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
    </div>
  ) : (
    <></>
  );
};
