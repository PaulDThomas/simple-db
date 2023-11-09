"use client";

import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../_context/AppContextProvider";

export interface iRecentLink {
  id: string;
  label: string;
}

export const RecentLinks = (): JSX.Element => {
  // Get current links
  const recentLinks = useMemo<iRecentLink[]>(() => 
    JSON.parse(
      window.localStorage.getItem("recentLinks") ?? "[]"
    ) as iRecentLink[]
  , []);

  // Return nothing if there are no links
  if (recentLinks.length === 0) {
    return <></>;
  }

  // Return header and links
  return (
    <div>
      <h1 className="text-xl mt2">Recently viewed</h1>
      {recentLinks.map((h, i) => (
        <div key={h.id ?? i}>
          <span>
            <Link
              id={`recentlinks-link-${h.id}`}
              href={`/datanav?id=${h.id}`}
              className="hover:underline m-1"
            >
              {h.label}
            </Link>
          </span>
        </div>
      ))}
    </div>
  );
};
