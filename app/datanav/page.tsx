"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { ChildrenTable } from "../_components/ChildrenTable";
import { ParentBreadcrumbs } from "../_components/ParentBreadcrumbs";
import { ThisItem } from "./ThisItem";
import { LoadFields } from "../LoadFields";

export default function DataNav() {
  const [itemList, setItemList] = useState<RowDataRow[]>([]);

  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");

  const fetchIds = useCallback(async (id: string | null) => {
    const url = `/api/rowdata${
      id ? `?family_id=${id}&child_level=1&parent_level=9` : ""
    }`;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = (await response.json()).rows as RowDataRow[];
      setItemList(data);
    }
  }, []);

  useEffect(() => {
    fetchIds(currentId);
  }, [currentId, fetchIds]);

  return (
    <LoadFields>
      <div>
        <ParentBreadcrumbs
          items={itemList.filter((item) => (item.level_change ?? 0) < 0)}
        />
        <ThisItem
          item={itemList.find((item) => (item.level_change ?? 0) === 0)}
        />
        <ChildrenTable
          items={itemList.filter((item) => (item.level_change ?? 0) > 0)}
        />
        <hr style={{ marginTop: "2rem" }} />
      </div>
    </LoadFields>
  );
}
