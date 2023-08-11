"use client";

import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import Link from "next/link";
import { RowDataRow } from "../api/rowdata/RowDataRow";

interface ShowBreadcrumbProps {
  id: string;
  item?: RowDataRow;
}

export const ShowBreadcrumb = ({
  id,
  item,
}: ShowBreadcrumbProps): JSX.Element => {
  const { state } = useContext(AppContext);
  const thisItem = item ?? state.rows?.find((row) => row.id === id);
  const bcFields =
    state.fields?.filter(
      (field) =>
        field.groupname === thisItem?.groupname &&
        field.simple_table_row.inBreadcrumb
    ) ?? [];

  return !thisItem ? (
    <span>Id ${id} not found</span>
  ) : (
    <div>
      <Link
        href={`/datanav?id=${id}`}
        style={{ margin: "1rem", borderBottom: "1px solid black" }}
      >
        {bcFields.map((field, i) => {
          console.log(field);
          return (
            <>
              {i > 0 && "/"}
              <span key={i} style={{ paddingLeft: "2px", paddingRight: "2px" }}>
                {
                  thisItem.simple_table_row[
                    field.simple_table_row.fieldName as string
                  ] as string
                }
              </span>
            </>
          );
        })}
      </Link>
    </div>
  );
};
