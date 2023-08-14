import { useContext } from "react";
import EditableCell from "../_components/EditableCell";
import { AppContext } from "../_context/AppContextProvider";
import { RowDataRow } from "../api/rowdata/RowDataRow";

interface ThisItemProps {
  item?: RowDataRow;
}

export const ThisItem = ({ item }: ThisItemProps) => {
  const { state } = useContext(AppContext);
  const bcFields =
    state.fields
      ?.filter((field) => field.groupname === item?.groupname)
      .sort((a, b) => a.grouporder - b.grouporder) ?? [];

  return !item ? (
    <div>Item not found</div>
  ) : (
    <div style={{ margin: "2rem" }}>
      <h3>ID: {item.id}</h3>
      <div style={{ display: "table", width: "100%", marginTop: "1rem" }}>
        {bcFields.map((field, i) => {
          return (
            <div
              key={i}
              style={{
                paddingLeft: "2px",
                paddingRight: "2px",
                display: "table-row",
              }}
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "table-cell",
                  width: "30%",
                  textAlign: "end",
                  paddingRight: "1rem",
                }}
              >
                {field.simple_table_row.fieldLabel}
              </span>
              <span style={{ display: "table-cell" }}>
                <EditableCell
                  columnNumber={1}
                  cellField={field.simple_table_row.fieldName}
                  rowData={{ ...item.simple_table_row, id: item.id }}
                  operation="PATCH_CELL"
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
