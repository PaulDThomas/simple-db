import Link from "next/link";
import { LoadFields } from "./LoadFields";
import { Search } from "./Search";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Simple DB host</h1>
      <div style={{ position: "relative" }}>
        <Link href="/import">Import spreadsheet</Link>
      </div>
      <LoadFields>
        <Search />
      </LoadFields>
    </main>
  );
}
