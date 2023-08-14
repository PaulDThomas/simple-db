"use client";

export function handleBlur(
  e: React.FocusEvent<HTMLInputElement>,
  newValue: Date | number | string | boolean,
  toDoUpdate: React.MutableRefObject<boolean>,
  timer: React.MutableRefObject<NodeJS.Timeout | null>,
  setCurrentValue: (ret: unknown) => void,
  doUpdate: () => void
) {
  e.stopPropagation();
  e.preventDefault();
  if (timer.current) clearTimeout(timer.current);
  toDoUpdate.current = true;
  setCurrentValue(newValue);
  doUpdate();
}
