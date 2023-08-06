import Link from "next/link";
import { RowDataRow } from "./RowDataRow";

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
            <Link href={`?id=${item.id}`} key={item.id}>
              <span>
                {item.level_change} ={" "}
                {Object.keys(item.simple_table_row).join("|")}
                <span style={{ color: "blue" }}>&nbsp;//&nbsp;</span>
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};
