import express from "express";

import getContacts from "../controllers/hubspot/getContacts";
import getCallback from "../controllers/hubspot/getCallback";

export const router = express.Router();

router //
  .route("/contacts")
  .get(getContacts);

router //
  .route("/callback")
  .get(getCallback);
