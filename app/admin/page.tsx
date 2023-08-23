"use client";

import { useCallback, useState } from "react";
import styles from "../page.module.css";

export default function AdminPage(): JSX.Element {
  const [responseText, setResponseText] = useState<string>("");
  const doInitialise = useCallback(async () => {
    const url = `/api/initialise`;
    const response = await fetch(url);
    setResponseText(JSON.stringify(await response.json(), null, 2));
  }, []);

  const queryTables = useCallback(async () => {
    const response1 = fetch(`/api/fields`);
    const response2 = fetch(`/api/rowdata`);
    // await Promise.all([response1,response2]);
    setResponseText(
      JSON.stringify(
        [await (await response1).json(), await (await response2).json()],
        null,
        2
      )
    );
  }, []);

  return (
    <main className={styles.main}>
      <h1>Simple DB admin page</h1>
      <div>
        <table>
          <tbody>
            <tr>
              <td>DB host</td>
              <td>{process.env.PGSQL_HOST ?? "Not set"}</td>
            </tr>
            <tr>
              <td>DB`</td>
              <td>{process.env.PGSQL_DATABASE ?? "Not set"}</td>
            </tr>
            <tr>
              <td>DB uid</td>
              <td>{process.env.PGSQL_USER ?? "Not set"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            doInitialise();
          }}
        >
          Initialise DB
        </button>
        &nbsp;
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            queryTables();
          }}
        >
          Get fields
        </button>
      </div>
      <div>
        <pre style={{ maxWidth: "80vw" }}>{responseText}</pre>
      </div>
    </main>
  );
}
