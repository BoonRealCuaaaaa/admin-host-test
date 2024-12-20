import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/shared/table";
import Loader from "@src/components/shared/loader";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";

export interface MainTableProps<T> {
  table: TableType<T>;
  isLoading: boolean;
  isPlaceholderData: boolean;
}

export default function MainTable<T>({
  table,
  isLoading,
  isPlaceholderData,
}: MainTableProps<T>) {
  console.log(isLoading);
  return (
    <Table className="border-[#F1F1F4] border border-r-0 border-l-0 divide-[#F1F1F4] divide-y">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="divide-x divide-[#F1F1F4] bg-gray-50"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{ width: header.column.columnDef.meta?.width }}
                  className={`text-[#4B5675] font-normal px-5 h-10`}
                >
                  <div
                    className={`flex items-center ${
                      header.column.columnDef.meta?.headerAlign === "center"
                        ? "justify-center"
                        : header.column.columnDef.meta?.headerAlign === "end"
                        ? "justify-end"
                        : "justify-start"
                    } gap-x-2`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.columnDef.enableSorting === true && (
                      <div className="flex flex-col justify-center items-center">
                        {header.column.getIsSorted() === "asc" ? (
                          <>
                            <ChevronUp className="stroke-[#78829D] stroke-2 text-[9px]" />
                            <ChevronDown className="stroke-[#78829D] stroke-1 text-[8px]" />{" "}
                          </>
                        ) : header.column.getIsSorted() === "desc" ? (
                          <>
                            <ChevronUp className="stroke-[#78829D] stroke-1 text-[8px]" />
                            <ChevronDown className="stroke-[#78829D] stroke-2 text-[9px]" />{" "}
                          </>
                        ) : (
                          <>
                            <ChevronUp className="stroke-[#78829D] stroke-1 text-[8px] font-semibold" />
                            <ChevronDown className="stroke-[#78829D] stroke-1 text-[8px] font-bold" />{" "}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="relative">
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 flex justify-center items-center bg-gray-50 transition-all duration-200 ${
            isLoading || isPlaceholderData ? "opacity-75 z-20" : "opacity-0 hidden"
          }`}
        >
          <Loader />
        </div>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="divide-x divide-[#F1F1F4] px-5 h-16"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table
                .getHeaderGroups()
                .map((headerGroups) => {
                  return headerGroups.headers.length;
                })
                .reduce((a, b) => a + b, 0)}
              className="h-24 text-center font-medium text-base"
            >
              {!isLoading && "No results"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
