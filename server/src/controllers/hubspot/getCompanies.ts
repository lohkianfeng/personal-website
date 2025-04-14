import axios from "axios";
import config from "../../config";

import { Request, Response } from "express";

const getCompanies = async (req: Request, res: Response): Promise<any> => {
  const access_token = config.hubspot.private.accessToken;
  const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/companies`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      limit: 10,
      archived: false,
    },
  });

  const formattedData = response.data.results.map(({ id, createdAt, updatedAt, archived, properties }) => ({
    id,
    createdAt,
    updatedAt,
    archived,
    ...properties,
  }));

  res.status(200).json({ companies: formattedData });
};

export default getCompanies;
