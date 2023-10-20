import { TextInput } from "flowbite-react";
import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";

export const Control4String = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <TextInput
      disabled={ctx.operation === "NONE"}
      value={`${ctx.currentValue ?? ""}`}
      sizing="sm"
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
