import { Suspense } from "react";
import { PreState } from "./PreState";
import SheetUploader from "./SheetUploader";
import WorkbookViewer from "./WorkbookViewer";
import styles from "./page.module.css";
import WorkbookData from "./WorkbookData";
import FieldTable from "./FieldTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Simple DB host</h1>
      <SheetUploader />
      <div style={{ position: "relative" }}>
        <Suspense fallback={<p>Loading...</p>}>
          <FieldTable groupName="TPV data agreements" />
          <WorkbookData />
          {/* <WorkbookViewer /> */}
        </Suspense>
      </div>
      <PreState />
    </main>
  );
}
