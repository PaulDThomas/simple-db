import { Suspense } from "react";
import SheetUploader from "./SheetUploader";
import WorkbookViewer from "./WorkbookViewer";
import styles from "../page.module.css";
import RowDataTable from "./RowDataTable";
import FieldTable from "./FieldTable";

export default function Home() {
  return (
    <>
      <SheetUploader />
      <div style={{ position: "relative" }}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkbookViewer />
          <FieldTable />
          <RowDataTable />
        </Suspense>
      </div>
    </>
  );
}
