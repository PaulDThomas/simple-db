import Link from "next/link";
import { Fragment } from "react";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { AddNewRowDataButton } from "./AddRowDataButton";
import { ShowBreadcrumb } from "../_components/ShowBreadcrumb";

interface ParentBreadcrumbsProps {
  items: RowDataRow[];
  thisGroupName: string;
}

export const ParentBreadcrumbs = ({
  items,
  thisGroupName,
}: ParentBreadcrumbsProps) => {
  return items.length === 0 ? (
    <div className="flex items-center">
      <Link href={"/"} className="mr-2 hover:underline">
        Back to search
      </Link>
      {thisGroupName !== "" && (
        <AddNewRowDataButton groupName={thisGroupName} />
      )}
    </div>
  ) : (
    <div>
      <h5 className="text-sm left-2">Parents</h5>
      <div className="flex items-center">
        {items
          .filter((item) => (item.level_change ?? 0) < 0)
          .sort(
            (a, b) => (a.level_change as number) - (b.level_change as number)
          )
          .map((item, i, items) => (
            <Fragment key={item.id}>
              {i === 0 && <AddNewRowDataButton groupName={item.groupname} />}
              {i > 0 && <span style={{ color: "blue" }}>=&gt;</span>}
              <ShowBreadcrumb id={item.id} item={item} />
              <AddNewRowDataButton
                parentId={item.id}
                groupName={
                  i < items.length - 1 ? items[i + 1].groupname : thisGroupName
                }
              />
            </Fragment>
          ))}
      </div>
    </div>
  );
};
