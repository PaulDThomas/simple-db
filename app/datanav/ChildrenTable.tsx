import Link from "next/link";
import { RowDataRow } from "../api/rowdata/RowDataRow";

interface ChildrenTableProps {
  items: RowDataRow[];
}

export const ChildrenTable = ({ items: itemList }: ChildrenTableProps) => {
  return itemList.length === 0 ? (
    <>No children</>
  ) : (
    <>
      <h5>Children</h5>
      <table style={{ border: "1px solid black" }}>
        <tbody>
          {itemList
            .filter((item) => (item.level_change ?? 0) > 0)
            .sort((a, b) => {
              if (
                a.level_change !== undefined &&
                b.level_change !== undefined
              ) {
                return a.level_change - b.level_change;
              } else {
                return a.groupname.localeCompare(b.groupname);
              }
            })
            .map((item) => (
              <tr key={item.id}>
                <td>level: {item.level_change}</td>
                <td>groupname: {item.groupname}</td>
                <td>
                  id: <Link href={`?id=${item.id}`}>{item.id}</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
