"use client";

import { useCallback, useState } from "react";
import { Button } from "flowbite-react";

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
    <>
      <div className="flex">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            doInitialise();
          }}
        >
          Initialise DB
        </Button>
        &nbsp;
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            queryTables();
          }}
        >
          Get fields
        </Button>
      </div>
      <div>
        <pre style={{ maxWidth: "80vw" }}>{responseText}</pre>
      </div>
    </>
  );
}
