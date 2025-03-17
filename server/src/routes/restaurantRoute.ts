import express from "express";

import getRestaurant from "../controllers/restaurant/getRestaurant";

export const router = express.Router();

router //
  .route("/")
  .get(getRestaurant);
