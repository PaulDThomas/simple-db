import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { TextInput } from "flowbite-react";

export const Control4Number = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <TextInput
      type="number"
      disabled={ctx.operation === "NONE"}
      sizing="sm"
      value={typeof ctx.currentValue === "number" ? ctx.currentValue : ""}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
        ctx.debounceChange(e.currentTarget.value);
      }}
      onBlur={(e) => {
        e.preventDefault();
        e.stopPropagation();
        ctx.immediateChange(e.currentTarget.value);
      }}
    />
  ) : (
    <></>
  );
};
