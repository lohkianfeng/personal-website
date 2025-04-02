import axios from "axios";

const HUBSPOT_CLIENT_ID = "6ba488da-c9ca-4c33-9da2-6c3e2a42a454";
const HUBSPOT_CLIENT_SECRET = "8c8c5269-fd04-4c6a-9062-c8c30339ec90";
const REDIRECT_URI = "http://localhost:5000/api/hubspot/callback";

import { Request, Response } from "express";

const getCallback = async (req: Request, res: Response): Promise<any> => {
  const code = req.query.code as string;
  if (!code) throw new Error();

  const response = await axios.post(
    "https://api.hubapi.com/oauth/v1/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: HUBSPOT_CLIENT_ID,
      client_secret: HUBSPOT_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: code,
    })
  );

  const { access_token } = response.data;

  res.redirect(`http://localhost:3000/projects/hubspot/contacts?token=${access_token}`);
};

export default getCallback;
