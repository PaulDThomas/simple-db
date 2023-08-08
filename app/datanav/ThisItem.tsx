import { SimpleTable } from "@asup/simple-table";
import { RowDataRow } from "../api/rowdata/RowDataRow";

interface ThisItemProps {
  items: RowDataRow[];
}

export const ThisItem = ({ items }: ThisItemProps) => {
  return items.length === 0 ? (
    <>No item</>
  ) : (
    <div
      style={{
        margin: "2rem",
      }}
    >
      {items.map((item) => (
        <div key={item.id}>
          <h3>id: {item.id}</h3>
          <h2>Data:</h2>
          <table>
            <tbody>
              {Object.keys(item.simple_table_row).map((sr, i) => (
                <tr key={i}>
                  <td>{sr}</td>
                  <td>{JSON.stringify(item.simple_table_row[sr])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
