import express from "express";

import ocrExtract from "@/controllers/ocr/ocrExtract";

export const router = express.Router();

router //
  .route("/extract/:fileId")
  .post(ocrExtract);
