import dotenv from "dotenv";

dotenv.config();

const normalizeEnvValue = (value, fallback = "") => {
  if (value === undefined || value === null) {
    return fallback;
  }

  const trimmed = String(value).trim().replace(/^['\"]|['\"]$/g, "");
  return trimmed || fallback;
};

export const env = {
  port: Number(normalizeEnvValue(process.env.PORT, 8000)),
  mongoUri: normalizeEnvValue(process.env.MONGO_URI, "mongodb://127.0.0.1:27017/real-estate-advisor"),
  flaskApiUrl: normalizeEnvValue(process.env.FLASK_API_URL, "http://localhost:5000/predict"),
  clientUrl: normalizeEnvValue(process.env.CLIENT_URL, "http://localhost:5173")
};
