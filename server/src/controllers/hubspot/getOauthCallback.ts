import exchangeForTokens from "./exchangeForTokens";

import { Request, Response } from "express";

const getOauthCallback = async (req: Request, res: Response): Promise<any> => {
  const code = req.query.code as string;
  const state = req.query.state as string;
  if (!code) throw new Error();

  const companyId = 1;
  const grant_type = "authorization_code";
  await exchangeForTokens(res, companyId, grant_type, code);

  res.redirect(state);
};

export default getOauthCallback;
