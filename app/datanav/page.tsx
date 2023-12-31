"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LoadFields } from "../LoadFields";
import { ChildrenTable } from "./ChildrenTable";
import { ParentBreadcrumbs } from "./ParentBreadcrumbs";
import { iRecentLink } from "../_components/RecentLinks";
import { AppContext } from "../_context/AppContextProvider";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { ThisItem } from "./ThisItem";

export default function DataNav() {
  // State vars
  const { state } = useContext(AppContext);
  const groupNames = state.fields
    ?.map((field) => field.groupname)
    .reduce((gs, g) => (gs.includes(g) ? gs : [...gs, g]), [] as string[]);

  // List of current items
  const [itemList, setItemList] = useState<RowDataRow[]>([]);

  // Current id from URL
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

  // Static helper variables
  const thisItem = itemList.find((item) => (item.level_change ?? 0) === 0);
  const nextGroupName = useMemo(() => {
    if (groupNames) {
      const ix = groupNames.findIndex((g) => g === thisItem?.groupname);
      if (ix > -1 && ix < groupNames.length - 1) {
        return groupNames[ix + 1];
      }
    }
  }, [groupNames, thisItem?.groupname]);
  // Breadcrumb fields
  const bcFields =
    state.fields
      ?.filter(
        (field) =>
          field.groupname === thisItem?.groupname &&
          field.simple_table_row.inBreadcrumb
      )
      .sort((a, b) => a.grouporder - b.grouporder) ?? [];
  // Breadcrumb label
  const bcLabel = bcFields
    .map(
      (field) =>
        thisItem?.simple_table_row[field.simple_table_row.fieldName] as string
    )
    .join(" / ");

  useEffect(() => {
    currentId && fetchIds(currentId);
  }, [currentId, fetchIds]);

  // Update recent links
  useEffect(() => {
    if (thisItem) {
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
  }, [bcLabel, thisItem]);

  // Return not found / loaded information
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
          thisGroupName={thisItem?.groupname ?? ""}
        />
        {thisItem ? (
          <>
            <ThisItem item={thisItem} />
            <ChildrenTable
              parentId={thisItem.id}
              groupName={nextGroupName}
              items={itemList.filter((item) => (item.level_change ?? 0) > 0)}
            />
          </>
        ) : (
          <div className="mt-3">No item found</div>
        )}
      </div>
    </LoadFields>
  );
}
