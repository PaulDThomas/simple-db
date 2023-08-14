"use client";

export function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  newValue: Date | number | string | boolean,
  toDoUpdate: React.MutableRefObject<boolean>,
  timerVal: React.MutableRefObject<number>,
  setCurrentValue: (ret: unknown) => void,
  thisTimer = 1000
) {
  e.stopPropagation();
  e.preventDefault();
  toDoUpdate.current = true;
  timerVal.current = thisTimer;
  setCurrentValue(newValue);
}
