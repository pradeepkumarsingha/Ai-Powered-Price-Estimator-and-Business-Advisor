import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import predictionRoutes from "./routes/predictionRoutes.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Real estate advisor backend is healthy"
  });
});

app.use("/api", predictionRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
