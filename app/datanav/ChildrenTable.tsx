import Link from "next/link";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { ShowChildPanel } from "./ShowChildPanel";
import { AddNewRowDataButton } from "./AddRowDataButton";

interface ChildrenTableProps {
  items: RowDataRow[];
  parentId: string;
  groupName?: string;
}

export const ChildrenTable = ({
  items: itemList,
  parentId,
  groupName,
}: ChildrenTableProps) => {
  return itemList.length === 0 ? (
    <div className="flex items-center">
      <span className="mr-2">No children</span>
      {groupName && (
        <AddNewRowDataButton groupName={groupName} parentId={parentId} />
      )}
    </div>
  ) : (
    <>
      <div className="flex">
        <h5 className="text-sm mr-2">Children</h5>
        {groupName && (
          <AddNewRowDataButton groupName={groupName} parentId={parentId} />
        )}
      </div>
      <div className="w-full grid grid-rows-3 gap-4 grid-flow-col">
        {itemList
          .filter((item) => (item.level_change ?? 0) > 0)
          .sort((a, b) => {
            if (a.level_change !== undefined && b.level_change !== undefined) {
              return a.level_change - b.level_change;
            } else {
              return a.groupname.localeCompare(b.groupname);
            }
          })
          .map((item) => (
            <ShowChildPanel key={item.id} id={item.id} item={item} />
          ))}
      </div>
    </>
  );
};
