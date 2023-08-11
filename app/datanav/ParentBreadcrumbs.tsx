import Link from "next/link";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { ShowBreadcrumb } from "../ShowBreadcrumb";

interface ParentBreadcrumbsProps {
  items: RowDataRow[];
}

export const ParentBreadcrumbs = ({ items }: ParentBreadcrumbsProps) => {
  return items.length === 0 ? (
    <>Root!</>
  ) : (
    <div>
      <h5>Parent bookmarks:</h5>
      <div>
        {items
          .filter((item) => (item.level_change ?? 0) < 0)
          .sort(
            (a, b) => (a.level_change as number) - (b.level_change as number)
          )
          .map((item) => (
            <ShowBreadcrumb key={item.id} id={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};
