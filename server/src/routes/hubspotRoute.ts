import express from "express";

import getContacts from "../controllers/hubspot/getContacts";
import getOauthCallback from "../controllers/hubspot/getOauthCallback";
import getRemove from "../controllers/hubspot/getRemove";

import getCompanies from "../controllers/hubspot/getCompanies";
import postWebhooks from "../controllers/hubspot/postWebhooks";

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

router //
  .route("/companies")
  .get(getCompanies);

router //
  .route("/webhooks")
  .post(postWebhooks);
