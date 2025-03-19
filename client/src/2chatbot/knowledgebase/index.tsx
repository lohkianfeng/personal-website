import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/axios/axios";
import Loading from "@/components/errorPages/Loading";
import KbDataTable from "./table/KbDataTable";
import { kbColumns } from "./table/KbColumns";

const KnowledgeBase = () => {
  const getRestaurant = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/api/restaurant`);
      return response.data;
    },
  });
  const { isPending, error, data } = getRestaurant;

  if (isPending) return <Loading />;
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "No data";

  return (
    <div className="p-4">
      <KbDataTable //
        columns={kbColumns}
        data={data.restaurant}
        filterCols={["name"]}
      />
    </div>
  );
};

export default KnowledgeBase;
