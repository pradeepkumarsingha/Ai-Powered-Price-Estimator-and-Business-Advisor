import axios from "axios";
import { env } from "../config/env.js";

const isValidPredictionResponse = (data) => {
  return (
    data &&
    typeof data.predicted_price === "number" &&
    Array.isArray(data.price_range) &&
    data.price_range.length === 2 &&
    typeof data.recommendation === "string"
  );
};

export const requestFlaskPrediction = async (payload) => {
  try {
   const { data } = await axios.post(
  `${env.flaskApiUrl}/predict`,
  payload,
  {
    headers: {
      "Content-Type": "application/json"
    },
    timeout: 15000
  }
);

    if (data?.error) {
      const error = new Error(`Flask prediction failed: ${data.error}`);
      error.statusCode = 502;
      throw error;
    }

    if (!isValidPredictionResponse(data)) {
      const error = new Error("Flask service returned an invalid prediction payload");
      error.statusCode = 502;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Unable to fetch prediction from Flask service";

    const wrappedError = new Error(message);
    wrappedError.statusCode = error.response?.status || 502;
    throw wrappedError;
  }
};
