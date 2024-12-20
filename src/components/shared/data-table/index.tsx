import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Footer from "./components/footer";
import Header from "./components/header";
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import MainTable from "./components/main";
import useDebounce from "@src/hooks/use-debounce";
import { PAGINATION } from "./constants/pagination";

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerAlign?: 'start' | 'center' | 'end';
    width?: string;
  }
}

interface QueryParameterMapping {
  offset: string;
  limit: string;
  query?: string;
  order?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  columnWidths?: Record<string, string>;
  headerAligns?: Record<string, "center" | "start" | "end">;
  queryKey?: string[];
  fetchData: (
    searchParams: URLSearchParams
  ) => Promise<{ items: T[]; total: number }>;
  title:
    | string
    | (({ rowCount, total }: { rowCount: number; total: number }) => string);
  pageSize?: number;
  searchPlaceholder?: string;
  queryParameterMapping?: QueryParameterMapping;
  allowSearch?: boolean;
  allowNumOfRows?: boolean;
  buildValueForOrderQueryString?: (sorting: SortingState) => string | undefined;
}

export function DataTable<T>({
  columns,
  columnWidths = {},
  headerAligns = {},
  queryKey=["tableData"],
  fetchData,
  title,
  pageSize = 5,
  searchPlaceholder = "Search...",
  queryParameterMapping = {
    offset: "offset",
    limit: "limit",
    query: "query",
    order: "order",
  },
  allowSearch = true,
  allowNumOfRows = true,
  buildValueForOrderQueryString = (sorting) => {
    if (sorting.length === 0) return undefined;
    const sort = sorting[0];
    return `${sort.id}:${sort.desc ? "desc" : "asc"}`;
  },
}: DataTableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const debounceGlobalFilter = useDebounce(globalFilter);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [sorting, setSorting] = useState([]);

  // Fetch data with React Query
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const queryParamsForApi = new URLSearchParams(searchParams);
      const page = Number(searchParams.get(PAGINATION.PAGE));
      const pageSize = Number(searchParams.get(PAGINATION.PAGE_SIZE));

      if (isNaN(page) || isNaN(pageSize)) {
        return {items: [], total: 0};
      }

      queryParamsForApi.set(queryParameterMapping.offset, String(page * pageSize));
      queryParamsForApi.set(queryParameterMapping.limit, searchParams.get(PAGINATION.PAGE_SIZE));
      return await fetchData(queryParamsForApi);
    },
    enabled: !!searchParams,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    const newSearchParams: Record<string, string> = {};

    if (debounceGlobalFilter.length > 0 && queryParameterMapping.query) {
      table.resetPagination();
      newSearchParams[queryParameterMapping.query] = debounceGlobalFilter;
    }

    if (sorting.length > 0 && queryParameterMapping.order) {
      newSearchParams[queryParameterMapping.order] =
        buildValueForOrderQueryString(sorting);
    }

    newSearchParams[PAGINATION.PAGE] = pagination.pageIndex.toString();
    newSearchParams[PAGINATION.PAGE_SIZE] = pagination.pageSize.toString();

    setSearchParams(newSearchParams);
  }, [pagination, debounceGlobalFilter, sorting]);

  const resolvedColumns = useMemo(
    () =>
      columns.map((col) => {
        const columnId = col.id || col["accessorKey"];
        return {
          ...col,
          meta: {
            ...col.meta,
            width: columnId ? columnWidths[columnId as string] : undefined, // Attach custom widths
            headerAlign: columnId
              ? headerAligns[columnId as string]
              : undefined, // Attach custom widths
          },
        };
      }),
    [columns]
  );

  const table = useReactTable({
    data: data?.items || [],
    columns: resolvedColumns,
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    initialState: {
      pagination,
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    pageCount: data ? Math.ceil(data.total / pagination.pageSize) : -1,
    getCoreRowModel: getCoreRowModel(),
  });

  const resolvedTitle =
    typeof title === "function"
      ? title({
          rowCount: table.getRowCount(),
          total: data?.total || 0,
        })
      : title;

  return (
    <div className="border border-[#F1F1F4] rounded-xl">
      <Header
        title={resolvedTitle}
        allowSearch={allowSearch}
        searchValue={globalFilter}
        handleSearch={setGlobalFilter}
        searchPlaceholder={searchPlaceholder}
      />
      <MainTable table={table} isLoading={isLoading} isPlaceholderData={isPlaceholderData} />
      <Footer
        allowNumOfRows={allowNumOfRows}
        table={table}
        totalRows={data?.total}
      />
    </div>
  );
}
