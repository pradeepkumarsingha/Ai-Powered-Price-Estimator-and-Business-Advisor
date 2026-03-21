import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";

const app = express();

// app.use(
  // cors({
  //   origin: env.clientUrl,
  //   credentials: true
  // })
  const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-frontend-m6dx.onrender.com",
  "https://ai-powered-price-estimator-and-busi.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
// );
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Real estate advisor backend is healthy"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api", predictionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
