import path from "path";
import config from "../config";
import { Storage } from "@google-cloud/storage";

const serviceAccountPath = path.resolve(process.cwd(), "google-service-account.json");

const storage = new Storage({ keyFilename: serviceAccountPath });

const bucket = storage.bucket(config.google.bucketName);

export default bucket;
