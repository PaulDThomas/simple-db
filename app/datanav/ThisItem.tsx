import { useContext } from "react";
import EditableCell from "../_components/EditableCell";
import { AppContext } from "../_context/AppContextProvider";
import { RowDataRow } from "../api/rowdata/RowDataRow";
import { Spinner } from "flowbite-react";

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
    <div>
      Loading... <Spinner />
    </div>
  ) : (
    <>
      <div className="text-xl m-4 text-amber-600">{item.groupname}</div>
      <div className="grid grid-cols-1">
        {bcFields.map((field, i) => {
          return (
            <div
              key={i}
              className="border border-amber-400 w-30 mb-2 rounded grid grid-cols-3 gap-3"
            >
              <div className="flex justify-end my-1 ml-2 items-center">
                {field.simple_table_row.fieldLabel}
              </div>
              <div className="col-span-2 pr-2 my-1 w-full">
                <EditableCell
                  columnNumber={1}
                  rowNumber={i}
                  field={{
                    ...field.simple_table_row,
                    name: field.simple_table_row.fieldName,
                  }}
                  cellField={field.simple_table_row.fieldName}
                  rowData={{ ...item.simple_table_row, id: item.id }}
                  operation="PATCH_CELL"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end">
        <span className="text-sm text-gray-600">ID: {item.id}</span>
      </div>
    </>
  );
};
