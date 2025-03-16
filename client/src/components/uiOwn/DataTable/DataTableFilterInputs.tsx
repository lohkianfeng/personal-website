import { type TableType } from "./TableType";
import { Input } from "@/components/ui/input";

const removeUnderscore = (name: string) => {
  return name
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
};

const DataTableFilterInputs = <TData,>({ table, cols }: TableType<TData> & { cols: string[] }) => {
  return (
    <div className="flex gap-2">
      {cols.map((col, index) => (
        <Input
          key={index}
          name="filter"
          placeholder={`Filter ${removeUnderscore(col)}...`}
          className="w-auto"
          value={(table.getColumn(col)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(col)?.setFilterValue(event.target.value)}
        />
      ))}
    </div>
  );
};

export default DataTableFilterInputs;
