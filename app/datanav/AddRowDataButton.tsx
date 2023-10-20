import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AppContext } from "../_context/AppContextProvider";
import { saveRows } from "../_functions/saveRows";
import { RowDataRow } from "../api/rowdata/RowDataRow";

interface AddNewRowDataButtonProps {
  parentId?: string;
  groupName: string;
}

export const AddNewRowDataButton = ({
  parentId,
  groupName,
}: AddNewRowDataButtonProps): JSX.Element => {
  const router = useRouter();
  return (
    <BsFillPlusCircleFill
      size={16}
      color="green"
      style={{
        marginRight: "4px",
      }}
      aria-label={`Add ${groupName}`}
      title={`Add ${groupName}`}
      onClick={async (e: React.SyntheticEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const newItems: RowDataRow[] = [
          {
            id: crypto.randomUUID(),
            groupname: groupName,
            parent_id: parentId,
            simple_table_row: {},
          },
        ];
        await saveRows(newItems, false);
        router.push(`/datanav?id=${newItems[0].id}`);
      }}
    />
  );
};
