import express from "express";

import upload from "@/middleware/upload";

import uploadFile from "@/controllers/file/uploadFile";
import getFiles from "@/controllers/file/getFiles";
import getSignedUrl from "@/controllers/file/getSignedUrl";
import deleteFile from "@/controllers/file/deleteFile";

export const router = express.Router();

router //
  .route("/upload")
  .post(upload.array("files"), uploadFile);

router //
  .route("/")
  .get(getFiles);

router //
  .route("/view/:fileId")
  .get(getSignedUrl);

router //
  .route("/delete/:fileId")
  .get(deleteFile);
