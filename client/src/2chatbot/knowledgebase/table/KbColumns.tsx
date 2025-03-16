import Header from "@/components/uiOwn/DataTable/Header";

import { type ColumnDef, type Row } from "@tanstack/react-table";
export type KbDataT = {
  name: string;
  address: string;
  description: string;
  url: string;
};

export const kbColumns: ColumnDef<KbDataT>[] = [
  {
    accessorKey: "name",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "address",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "description",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "url",
    header: (data) => <Header column={data.column} />,
  },
];

export const Cell = <T,>({ row, col }: { row: Row<T>; col: string }) => {
  const data = row.original as Record<string, string[]>;
  return (
    <>
      {data[col] //
        .map((item, index) => (
          <span key={index}>
            {item}
            <br />
          </span>
        ))}
    </>
  );
};
