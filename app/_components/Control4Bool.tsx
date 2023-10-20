import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { Checkbox } from "flowbite-react";

export const Control4Bool = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <div className="w-full flex justify-center">
      <Checkbox
        disabled={ctx.operation === "NONE"}
        checked={ctx.currentValue === true}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          ctx.immediateChange(e.currentTarget.checked);
        }}
      />
    </div>
  ) : (
    <></>
  );
};
