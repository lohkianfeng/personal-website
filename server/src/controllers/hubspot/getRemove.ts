import { refreshTokenStore } from "./exchangeForTokens";

import { Request, Response } from "express";

const getRemove = async (req: Request, res: Response): Promise<any> => {
  const { companyId } = req.params;
  const company_id = Number(companyId);

  delete refreshTokenStore[company_id];

  res.clearCookie("hubspot_access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "HubSpot integration removed successfully" });
};

export default getRemove;
