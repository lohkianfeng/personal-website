import { type TableType } from "./TableType";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import Pagination from "@/components/mui/Pagination";

const DataTablePagination = <TData,>({ table }: TableType<TData>) => {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex">
        <p className="text-muted-foreground text-sm">
          <></>
          Number of rows: {table.getRowCount()}
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[25, 50, 75, 100].map((pageSize) => (
                <SelectItem className="cursor-pointer" key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination //
          count={pageCount}
          page={pageIndex + 1}
          onChange={(_, value) => table.setPageIndex(value - 1)}
        />
      </div>
    </div>
  );
};

export default DataTablePagination;
