import express from "express";

import getContacts from "../controllers/hubspot/getContacts";

export const router = express.Router();

router //
  .route("/contacts")
  .get(getContacts);
