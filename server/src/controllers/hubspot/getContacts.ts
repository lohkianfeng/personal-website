import config from "../../config";
import { Client } from "@hubspot/api-client";

const hubspotClient = new Client({ accessToken: config.hubspot });

const limit = 10;
const after = undefined;
const properties = undefined;
const propertiesWithHistory = undefined;
const associations = undefined;
const archived = false;

import { Request, Response } from "express";

const getContacts = async (req: Request, res: Response): Promise<any> => {
  const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(
    limit,
    after,
    properties,
    propertiesWithHistory,
    associations,
    archived
  );

  // console.log(JSON.stringify(apiResponse, null, 2));

  const formattedData = apiResponse.results.map(({ id, createdAt, updatedAt, archived, properties }) => ({
    id,
    createdAt,
    updatedAt,
    archived,
    ...properties,
  }));

  res.status(200).json({ contacts: formattedData });
};

export default getContacts;
