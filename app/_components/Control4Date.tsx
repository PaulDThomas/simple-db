import { useContext } from "react";
import { EditableCellContext } from "./EditableCell";
import { Datepicker } from "flowbite-react";

export const Control4Date = () => {
  const ctx = useContext(EditableCellContext);

  return ctx ? (
    <Datepicker
      style={{ width: "calc(100% - 4px)" }}
      sizing="sm"
      disabled={ctx.operation === "NONE"}
      value={
        typeof ctx.currentValue === "string"
          ? ctx.currentValue.slice(0, 10)
          : ctx.currentValue instanceof Date
          ? ctx.currentValue.toISOString().slice(0, 10)
          : ""
      }
      onSelectedDateChanged={(ret: Date) => {
        const offset = ret.getTimezoneOffset();
        ret = new Date(ret.getTime() - offset * 60 * 1000);
        ctx.immediateChange(ret.toISOString().slice(0, 10));
      }}
    />
  ) : (
    <></>
  );
};
