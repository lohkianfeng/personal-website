import config from "@/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router as chatRoute } from "@/routes/chatRoute";
import { router as restaurantRoute } from "@/routes/restaurantRoute";
import { router as hubspotRoute } from "@/routes/hubspotRoute";
import { router as fileRoute } from "@/routes/fileRoute";
import { router as ocrRoute } from "@/routes/ocrRoute";

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
    "https://kianfeng.com", // prod
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// routes
app.get("/api", (req: Request, res: Response): void => {
  res.status(200).send("This is /api route");
});

app.use("/api/chat", chatRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/hubspot", hubspotRoute);
app.use("/api/file", fileRoute);
app.use("/api/ocr", ocrRoute);

// http
app.listen(config.port, () => {
  console.log("HTTP server started on port", config.port);
});
