"use client";

import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { ListGroup } from "flowbite-react";

export default function WorkbookViewer() {
  const { state } = useContext(AppContext);
  const wb = state.workbook;

  return !state.processed ? (
    <></>
  ) : (
    <>
      {wb && (
        <div className="w-screen p-12">
          Sheets:
          <ListGroup
            style={{
              marginBottom: "1rem",
            }}
          >
            {wb.SheetNames.map((s, i) => (
              <ListGroup.Item key={i} disabled active={i === 0}>
                {s}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </>
  );
}
