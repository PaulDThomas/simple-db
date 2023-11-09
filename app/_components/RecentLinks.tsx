"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidMinusCircle } from "react-icons/bi";

export interface iRecentLink {
  id: string;
  label: string;
}

export const RecentLinks = (): JSX.Element => {
  // Get current links
  const [checkLinks, setCheckLinks] = useState<boolean>(true);
  const [recentLinks, setRecentLinks] = useState<iRecentLink[]>([]);
  useEffect(() => {
    if (checkLinks) {
      setCheckLinks(false);
      const newLinks = JSON.parse(
        window.localStorage.getItem("recentLinks") ?? "[]"
      ) as iRecentLink[];
      setRecentLinks(newLinks);
    }
  }, [checkLinks]);

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
          <span className="flex items-center">
            <BiSolidMinusCircle
              color="red"
              onClick={() => {
                const newLinks = [...recentLinks];
                const ix = newLinks.findIndex((n) => n.id === h.id);
                if (ix > -1) {
                  newLinks.splice(i, 1);
                  window.localStorage.setItem("recentLinks", JSON.stringify(newLinks));
                  setRecentLinks(newLinks);
                }
              }}
            />
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
