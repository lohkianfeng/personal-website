import config from "@/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// express app
const app = express();

// cors
const corsOptions = {
  origin: [
    "http://localhost:3000", // dev
    "http://localhost", // dev (traefik)
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// routes
app.get("/api", (req: Request, res: Response): void => {
  res.status(200).send("This is /api route");
});

// http
app.listen(config.port, () => {
  console.log("HTTP server started on port", config.port);
});
