import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DataTableFilterInputs from "@/components/uiOwn/DataTable/DataTableFilterInputs";
import DataTableFilterCol from "@/components/uiOwn/DataTable/DataTableFilterCol";
import DataTableTable from "@/components/uiOwn/DataTable/DataTableTable";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterCols: string[];
};

const CompaniesDataTable = <TData, TValue>({ columns, data, filterCols }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: false }, //
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting, // sort
    getSortedRowModel: getSortedRowModel(), // sort
    onColumnFiltersChange: setColumnFilters, // filter input
    getFilteredRowModel: getFilteredRowModel(), // filter input
    onColumnVisibilityChange: setColumnVisibility, // filter col
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DataTableFilterInputs table={table} cols={filterCols} />
        </div>

        <DataTableFilterCol table={table} />
      </div>

      <DataTableTable table={table} />
    </div>
  );
};

export default CompaniesDataTable;
