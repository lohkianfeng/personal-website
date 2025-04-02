import { Client } from "@hubspot/api-client";

import { Request, Response } from "express";

const getContacts = async (req: Request, res: Response): Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Error();
  const token = authHeader.split(" ")[1];

  const hubspotClient = new Client({ accessToken: token });
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

  res.status(200).json({ contacts: formattedData });
};

export default getContacts;
