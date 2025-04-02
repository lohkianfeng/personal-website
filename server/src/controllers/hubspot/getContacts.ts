import { Client } from "@hubspot/api-client";
import exchangeForTokens, { refreshTokenStore } from "./exchangeForTokens";
import axios from "axios";

import { Request, Response } from "express";

const getContacts = async (req: Request, res: Response): Promise<any> => {
  const { companyId } = req.params;
  const company_id = Number(companyId);

  let access_token = req.cookies.hubspot_access_token;
  if (!access_token) {
    const grant_type = "refresh_token";
    access_token = await exchangeForTokens(res, company_id, grant_type);
  }
  if (!access_token) return res.status(200).json({});

  const hubspotClient = new Client({ accessToken: access_token });
  const limit = 10;
  const after = undefined;
  const properties = undefined;
  const propertiesWithHistory = undefined;
  const associations = undefined;
  const archived = false;

  const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(
    limit,
    after,
    properties,
    propertiesWithHistory,
    associations,
    archived
  );

  const formattedData = apiResponse.results.map(({ id, createdAt, updatedAt, archived, properties }) => ({
    id,
    createdAt,
    updatedAt,
    archived,
    ...properties,
  }));

  const response = await axios.get("https://api.hubapi.com/account-info/v3/details", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  res.status(200).json({ contacts: formattedData, portalId: response.data.portalId });
};

export default getContacts;
