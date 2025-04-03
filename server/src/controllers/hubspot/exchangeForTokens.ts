import config from "../../config";
import axios from "axios";

export const refreshTokenStore: Record<string, string> = {};

import { Response } from "express";

const exchangeForTokens = async (
  res: Response,
  companyId: number,
  grant_type: "authorization_code" | "refresh_token",
  code?: string
) => {
  if (grant_type === "refresh_token" && !refreshTokenStore[companyId]) return null;

  const response = await axios.post(
    "https://api.hubapi.com/oauth/v1/token", //
    new URLSearchParams({
      grant_type: grant_type,
      client_id: config.hubspot.clientId,
      client_secret: config.hubspot.clientSecret,
      ...(grant_type === "authorization_code" && {
        redirect_uri: config.hubspot.redirectUri,
        code: code,
      }),
      ...(grant_type === "refresh_token" && {
        refresh_token: refreshTokenStore[companyId],
      }),
    })
  );

  const { refresh_token, access_token, expires_in } = response.data;

  refreshTokenStore[companyId] = refresh_token;

  res.cookie("hubspot_access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: Math.round(expires_in * 0.75 * 1000),
  });

  return access_token;
};

export default exchangeForTokens;
