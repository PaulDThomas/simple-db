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
      <h5>Children</h5>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          gap: "2rem",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
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
