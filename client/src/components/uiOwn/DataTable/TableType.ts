import { type Table as TableT } from "@tanstack/react-table";

export type TableType<TData> = {
  table: TableT<TData>;
  exclude?: string[];
};
