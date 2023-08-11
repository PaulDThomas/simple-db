import Link from "next/link";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { ShowBreadcrumb } from "./ShowBreadcrumb";
import { Fragment } from "react";

interface ParentBreadcrumbsProps {
  items: RowDataRow[];
}

export const ParentBreadcrumbs = ({ items }: ParentBreadcrumbsProps) => {
  return items.length === 0 ? (
    <Link href={"/"}>Back to search</Link>
  ) : (
    <div>
      <h5>Parent bookmarks:</h5>
      <div>
        {items
          .filter((item) => (item.level_change ?? 0) < 0)
          .sort(
            (a, b) => (a.level_change as number) - (b.level_change as number)
          )
          .map((item, i) => (
            <Fragment key={item.id}>
              {i > 0 && <span style={{ color: "blue" }}>=&gt;</span>}
              <ShowBreadcrumb id={item.id} item={item} />
            </Fragment>
          ))}
      </div>
    </div>
  );
};
