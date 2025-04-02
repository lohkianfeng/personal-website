import express from "express";

import getContacts from "../controllers/hubspot/getContacts";
import getOauthCallback from "../controllers/hubspot/getOauthCallback";
import getRemove from "../controllers/hubspot/getRemove";

export const router = express.Router();

router //
  .route("/contacts/:companyId")
  .get(getContacts);

router //
  .route("/oauth-callback")
  .get(getOauthCallback);

router //
  .route("/remove/:companyId")
  .get(getRemove);
