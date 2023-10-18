"use client";

import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import EditableCell from "./EditableCell";

interface ShowBreadcrumbProps {
  id: string;
  item?: RowDataRow;
}

export const ShowChildPanel = ({
  id,
  item,
}: ShowBreadcrumbProps): JSX.Element => {
  const { state } = useContext(AppContext);
  const thisItem = item ?? state.rows?.find((row) => row.id === id);
  const bcFields =
    state.fields
      ?.filter(
        (field) =>
          field.groupname === thisItem?.groupname &&
          field.simple_table_row.inChild
      )
      .sort((a, b) => a.grouporder - b.grouporder) ?? [];

  return !thisItem ? (
    <></>
  ) : (
    <div className="w-full h-full rounded-lg border border-black p-2">
      <Link href={`/datanav?id=${id}`} className="hover:underline">
        <div className="text-lg text-amber-600">{thisItem.groupname}</div>
      </Link>
      {bcFields.map((field, i) => {
        return (
          <div key={i} className="px-1">
            <span>{field.simple_table_row.fieldLabel}</span>
            <span>
              <EditableCell
                columnNumber={1}
                rowNumber={i}
                field={{
                  ...field.simple_table_row,
                  name: field.simple_table_row.fieldName,
                }}
                cellField={field.simple_table_row.fieldName}
                rowData={thisItem.simple_table_row}
                operation="NONE"
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};
