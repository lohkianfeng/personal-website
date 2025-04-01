import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/axios/axios";
import Loading from "@/components/errorPages/Loading";
import ContactsDataTable from "./table/ContactsDataTable";
import { contactsColumns } from "./table/ContactsColumns";

const Contacts = () => {
  const getContacts = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/api/hubspot/contacts`);
      return response.data;
    },
  });
  const { isPending, error, data } = getContacts;

  if (isPending) return <Loading />;
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "No data";

  return (
    <div className="p-4">
      <ContactsDataTable //
        columns={contactsColumns}
        data={data.contacts}
        filterCols={["email"]}
      />
    </div>
  );
};

export default Contacts;
