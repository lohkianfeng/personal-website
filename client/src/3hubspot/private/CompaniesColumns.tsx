import Header from "@/components/uiOwn/DataTable/Header";

import { type ColumnDef } from "@tanstack/react-table";
export type CompaniesDataT = {
  id: number;
  name: string;
  simplyfi_hub_company_id: number;
  simplyfi_hub_expired_date: string;
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
    accessorKey: "simplyfi_hub_company_id",
    header: (data) => <Header column={data.column} />,
  },
  {
    accessorKey: "simplyfi_hub_expired_date",
    header: (data) => <Header column={data.column} />,
  },
];
