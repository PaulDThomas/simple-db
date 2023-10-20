"use client";

import { Tabs } from "flowbite-react";
import { Suspense, useContext } from "react";
import FieldTable from "./FieldTable";
import RowDataTable from "./RowDataTable";
import SheetUploader from "./SheetUploader";
import WorkbookViewer from "./WorkbookViewer";
import { AppContext } from "../_context/AppContextProvider";

export default function Home() {
  const { state } = useContext(AppContext);
  return (
    <>
      <SheetUploader />
      <div style={{ position: "relative" }}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkbookViewer />

          <div className="w-screen px-12">
            <Tabs.Group>
              <Tabs.Item title="Fields">
                <div className="w-9/12">
                  <FieldTable />
                </div>
              </Tabs.Item>
              {state.fields && state.fields.length > 0 && (
                <Tabs.Item title="Data">
                  <RowDataTable />
                </Tabs.Item>
              )}
            </Tabs.Group>
          </div>
        </Suspense>
      </div>
    </>
  );
}
