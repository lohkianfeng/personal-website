import Header from "@/components/uiOwn/DataTable/Header";

import { type ColumnDef } from "@tanstack/react-table";
export type CompaniesDataT = {
  id: number;
  name: string;
  domain: string;
};

export const companiesColumns: ColumnDef<CompaniesDataT>[] = [
  {
    accessorKey: "id",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "name",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "domain",
    header: (data) => <Header column={data.column} />,
  },
];
