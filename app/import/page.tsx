import { Suspense } from "react";
import SheetUploader from "./SheetUploader";
import WorkbookViewer from "./WorkbookViewer";
import styles from "../page.module.css";
import RowDataTable from "./RowDataTable";
import FieldTable from "./FieldTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Simple DB host</h1>
      <SheetUploader />
      <div style={{ position: "relative" }}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkbookViewer />
          <FieldTable />
          <RowDataTable />
        </Suspense>
      </div>
    </main>
  );
}
