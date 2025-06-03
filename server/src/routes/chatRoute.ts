import express from "express";

import postChat from "@/controllers/chat/postChat";

export const router = express.Router();

router //
  .route("/")
  .post(postChat);
