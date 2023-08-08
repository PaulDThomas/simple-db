import { Suspense } from "react";
import { PreState } from "./PreState";
import SheetUploader from "./SheetUploader";
import WorkbookViewer from "./WorkbookViewer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>MOSAIC simple DB host</h1>
      <SheetUploader />
      <div style={{ position: "relative" }}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkbookViewer />
        </Suspense>
      </div>
      <PreState />
    </main>
  );
}
