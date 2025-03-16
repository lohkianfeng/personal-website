import { type TableType } from "./TableType";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

const DataTableTable = <TData,>({ table }: TableType<TData>) => {
  return (
    <div className="grow overflow-auto rounded-xl border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead //
                      key={header.id}
                      className="bg-muted text-black"
                    >
                      {header.isPlaceholder //
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowCount() === 0 && (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}

          {table.getRowCount() > 0 &&
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {
                          //
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableTable;
