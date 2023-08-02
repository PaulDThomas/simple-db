import { Suspense } from "react";
import SheetUploader from "./SheetUploader";
import WorkbookViewer from "./WorkbookViewer";
import styles from "./page.module.css";
import WorkbookColumns from "./WorkbookColumns";

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
    </main>
  );
}
