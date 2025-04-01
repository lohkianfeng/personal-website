import Header from "@/components/uiOwn/DataTable/Header";

import { type ColumnDef, type Row } from "@tanstack/react-table";
export type ContactsDataT = {
  id: number;
  name: string;
  address: string;
  url: string;
  description: string;
};

export const contactsColumns: ColumnDef<ContactsDataT>[] = [
  {
    accessorKey: "id",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "firstname",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "lastname",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "email",
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
