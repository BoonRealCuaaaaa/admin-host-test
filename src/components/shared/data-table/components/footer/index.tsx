import { Table } from "@tanstack/react-table";
import SelectNumber from "./components/select-number";
import Pagination from "./components/pagination";

interface FooterProps<T> {
  allowNumOfRows?: boolean;
  table: Table<T>;
  totalRows: number;
}

export default function Footer<T>({
  allowNumOfRows = true,
  table,
  totalRows,
}: FooterProps<T>) {
  return (
    <div
      className={`px-5 py-4 flex ${
        allowNumOfRows ? "justify-between" : "justify-end"
      }  items-center shadow-[#00000008]`}
    >
      {allowNumOfRows && (
        <div className="flex items-center text-sm text-[#78829D]">
          Show
          <SelectNumber
            placeholder={table.getState().pagination.pageSize}
            handleSelectNumber={(num: number) => {
              table.setPageSize(() => num);
            }}
          />
          per page
        </div>
      )}
      <Pagination table={table} totalRows={totalRows} />
      
    </div>
  );
}
