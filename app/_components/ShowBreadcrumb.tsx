"use client";

import { Fragment, useContext } from "react";
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
    state.fields
      ?.filter(
        (field) =>
          field.groupname === thisItem?.groupname &&
          field.simple_table_row.inBreadcrumb
      )
      .sort((a, b) => a.grouporder - b.grouporder) ?? [];

  return !thisItem ? (
    <span>Id ${id} not found</span>
  ) : (
    <span>
      <Link href={`/datanav?id=${id}`} className="hover:underline m-1">
        {bcFields.length === 0 ? (
          <span>{id}</span>
        ) : (
          bcFields.map((field, i) => (
            <Fragment key={i}>
              {i > 0 && "/"}
              <span className="px-2">
                {
                  thisItem.simple_table_row[
                    field.simple_table_row.fieldName as string
                  ] as string
                }
              </span>
            </Fragment>
          ))
        )}
      </Link>
    </span>
  );
};
