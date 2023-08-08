"use client";

import { useContext } from "react";
import { AppContext } from "./_context/AppContextProvider";

export const PreState = () => {
  const { state } = useContext(AppContext);
  return (
    <div style={{ maxWidth: "90vw", overflow: "auto" }}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
