"use client";

import { useContext } from "react";
import { AppContext } from "../_context/AppContextProvider";
import Link from "next/link";
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
    <div>Id ${id} not found</div>
  ) : (
    <div
      style={{
        height: "300px",
        width: "300px",
        border: "1px solid black",
        borderRadius: "4px",
      }}
    >
      <Link
        href={`/datanav?id=${id}`}
        style={{ margin: "1rem", borderBottom: "1px solid black" }}
      >
        <h4 style={{ margin: "0.5rem" }}>{thisItem.groupname}</h4>
        {bcFields.map((field, i) => {
          return (
            <>
              <div
                key={i}
                style={{
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }}
              >
                <span
                  style={{
                    width: "33%",
                    maxWidth: "33%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {field.simple_table_row.fieldLabel}
                </span>
                <span style={{ width: "67%" }}>
                  <EditableCell
                    columnNumber={1}
                    cellField={field.simple_table_row.fieldName}
                    rowData={thisItem.simple_table_row}
                    operation="NONE"
                  />
                </span>
              </div>
            </>
          );
        })}
      </Link>
    </div>
  );
};
