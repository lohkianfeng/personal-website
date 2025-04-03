import exchangeForTokens from "./exchangeForTokens";

import { Request, Response } from "express";

const getOauthCallback = async (req: Request, res: Response): Promise<any> => {
  const code = req.query.code as string;
  if (!code) throw new Error();

  const companyId = Number(req.query.state);
  if (!companyId) throw new Error();

  const grant_type = "authorization_code";
  await exchangeForTokens(res, companyId, grant_type, code);

  res.redirect("http://localhost:3000/projects/hubspot/contacts");
};

export default getOauthCallback;
