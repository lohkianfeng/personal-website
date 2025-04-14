import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/axios/axios";
import Loading from "@/components/errorPages/Loading";
import CompaniesDataTable from "./private/CompaniesDataTable";
import { companiesColumns } from "./private/CompaniesColumns";

const PrivateApp = () => {
  const getCompanies = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/api/hubspot/companies`);
      return response.data;
    },
  });
  const { isPending, error, data } = getCompanies;

  if (isPending) return <Loading />;
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "No data";

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="underline">Companies</h1>
        <CompaniesDataTable //
          columns={companiesColumns}
          data={data?.companies || []}
          filterCols={["name"]}
        />
      </div>
    </div>
  );
};

export default PrivateApp;
