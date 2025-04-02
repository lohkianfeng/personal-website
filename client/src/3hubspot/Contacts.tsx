import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/axios/axios";
import Loading from "@/components/errorPages/Loading";
import ContactsDataTable from "./table/ContactsDataTable";
import { contactsColumns } from "./table/ContactsColumns";

import { useSearchParams } from "react-router";

const HUBSPOT_CLIENT_ID = "6ba488da-c9ca-4c33-9da2-6c3e2a42a454";
const REDIRECT_URI = "http://localhost:5000/api/hubspot/callback";

const handleHubSpotAuth = () => {
  const authUrl = `https://app-na2.hubspot.com/oauth/authorize?client_id=${HUBSPOT_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=oauth%20crm.objects.contacts.read&optional_scope=crm.lists.read`;
  window.location.href = authUrl;
};

import { Button } from "@/components/ui/button";
function HubSpotButton() {
  return <Button onClick={handleHubSpotAuth}>Integrate HubSpot</Button>;
}

const Contacts = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const getContacts = useQuery({
    queryKey: ["contacts", token],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/api/hubspot/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!token,
  });
  const { isPending, error, data } = getContacts;

  if (token) {
    if (isPending) return <Loading />;
    if (error) return "An error has occurred: " + error.message;
    if (!data) return "No data";
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <HubSpotButton />

      <ContactsDataTable //
        columns={contactsColumns}
        data={data?.contacts || []}
        filterCols={["email"]}
      />
    </div>
  );
};

export default Contacts;
