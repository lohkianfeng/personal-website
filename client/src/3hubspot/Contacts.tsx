import config from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/axios/axios";
import Loading from "@/components/errorPages/Loading";
import ContactsDataTable from "./table/ContactsDataTable";
import { contactsColumns } from "./table/ContactsColumns";
import { Button } from "@/components/ui/button";

const Contacts = () => {
  const getContacts = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const companyId = 1;
      const response = await axiosPrivate.get(`/api/hubspot/contacts/${companyId}`);
      return response.data;
    },
  });
  const { isPending, error, data } = getContacts;

  const removeIntegrationMutation = useMutation({
    mutationFn: async (companyId: number) => {
      await axiosPrivate.get(`/api/hubspot/remove/${companyId}`);
    },
    onSuccess: () => {
      getContacts.refetch();
    },
  });

  if (isPending) return <Loading />;
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "No data";

  const handleIntegrate = () => {
    const authUrl =
      `https://app.hubspot.com/oauth/authorize` +
      `?client_id=${encodeURIComponent(config.hubspot.clientId)}` +
      `&redirect_uri=${encodeURIComponent(config.hubspot.redirectUri)}` +
      `&scope=oauth%20crm.objects.contacts.read` +
      `&optional_scope=crm.lists.read` +
      `&state=${encodeURIComponent(window.location.href)}`;

    window.location.href = authUrl;
  };

  const handleRemove = async () => {
    const companyId = 1;
    removeIntegrationMutation.mutate(companyId);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="underline">Integration with HubSpot</h1>
        {data?.portalId ? ( //
          <>
            <p>Portal Id: {data.portalId}</p>
            <Button onClick={handleRemove}>Remove</Button>
          </>
        ) : (
          <Button onClick={handleIntegrate}>Integrate</Button>
        )}
      </div>

      <div>
        <h1 className="underline">Contacts</h1>
        <ContactsDataTable //
          columns={contactsColumns}
          data={data?.contacts || []}
          filterCols={["email"]}
        />
      </div>
    </div>
  );
};

export default Contacts;
