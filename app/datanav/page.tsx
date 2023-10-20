"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadFields } from "../LoadFields";
import { ChildrenTable } from "../_components/ChildrenTable";
import { ParentBreadcrumbs } from "../_components/ParentBreadcrumbs";
import { iRecentLink } from "../_components/RecentLinks";
import { AppContext } from "../_context/AppContextProvider";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { ThisItem } from "./ThisItem";

export default function DataNav() {
  const { state } = useContext(AppContext);
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

  const thisItem = itemList.find((item) => (item.level_change ?? 0) === 0);
  const bcFields =
    state.fields
      ?.filter(
        (field) =>
          field.groupname === thisItem?.groupname &&
          field.simple_table_row.inBreadcrumb
      )
      .sort((a, b) => a.grouporder - b.grouporder) ?? [];

  useEffect(() => {
    currentId && fetchIds(currentId);
  }, [currentId, fetchIds]);

  useEffect(() => {
    if (thisItem) {
      // Breadcrumb label
      const bcFields =
        state.fields
          ?.filter(
            (field) =>
              field.groupname === thisItem?.groupname &&
              field.simple_table_row.inBreadcrumb
          )
          .sort((a, b) => a.grouporder - b.grouporder) ?? [];
      const bcLabel = bcFields
        .map(
          (field) =>
            thisItem?.simple_table_row[
              field.simple_table_row.fieldName
            ] as string
        )
        .join(" / ");

      // Save back to storage
      const oldLinks = JSON.parse(
        window.localStorage.getItem("recentLinks") ?? "[]"
      ) as iRecentLink[];
      window.localStorage.setItem(
        "recentLinks",
        JSON.stringify([
          {
            id: thisItem.id,
            label: bcLabel,
          },
          ...oldLinks.filter((l) => l.id !== thisItem.id).slice(0, 9),
        ])
      );
    }
  }, [state.fields, thisItem]);

  return !currentId ? (
    <div className="w-full">
      <div className="flex justify-start">
        <Link href="/" className="text-sm text-amber-900">
          Back to search
        </Link>
      </div>
      <div className="flex justify-center">No data requested</div>
    </div>
  ) : (
    <LoadFields>
      <div>
        <ParentBreadcrumbs
          items={itemList.filter((item) => (item.level_change ?? 0) < 0)}
        />
        <ThisItem item={thisItem} />
        <ChildrenTable
          items={itemList.filter((item) => (item.level_change ?? 0) > 0)}
        />
        <hr style={{ marginTop: "2rem" }} />
      </div>
    </LoadFields>
  );
}
