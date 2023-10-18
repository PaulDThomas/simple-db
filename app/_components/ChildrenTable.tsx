import Link from "next/link";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { ShowChildPanel } from "./ShowChildPanel";

interface ChildrenTableProps {
  items: RowDataRow[];
}

export const ChildrenTable = ({ items: itemList }: ChildrenTableProps) => {
  return itemList.length === 0 ? (
    <>No children</>
  ) : (
    <>
      <h5 className="text-sm">Children</h5>
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
