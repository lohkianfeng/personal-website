import axios from "axios";
import exchangeForTokens from "./exchangeForTokens";

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

  const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/contacts`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      limit: 10,
      archived: false,
    },
  });

  const formattedData = response.data.results.map(({ id, createdAt, updatedAt, archived, properties }: any) => ({
    id,
    createdAt,
    updatedAt,
    archived,
    ...properties,
  }));

  const responseDetails = await axios.get(`https://api.hubapi.com/account-info/v3/details`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  res.status(200).json({ contacts: formattedData, portalId: responseDetails.data.portalId });
};

export default getContacts;
