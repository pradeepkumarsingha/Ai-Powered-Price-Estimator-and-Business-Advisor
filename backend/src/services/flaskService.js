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
    console.log("Sending payload to Flask:", payload);

    // 1. Make the request to Flask
    const { data } = await axios.post(env.flaskApiUrl, payload, {
      headers: { 
        "Content-Type": "application/json" 
      },
      timeout: 60000 // 60s timeout for Render Free Tier cold starts
    });

    console.log("Received data from Flask:", data);

    // 2. Check for explicit error messages from Flask
    if (data?.error) {
      const error = new Error(`Flask prediction failed: ${data.error}`);
      error.statusCode = 502;
      throw error;
    }

    // 3. Validate the structure of the response
    if (!isValidPredictionResponse(data)) {
      console.error("Validation failed for data:", data);
      const error = new Error("Flask service returned an invalid prediction payload");
      error.statusCode = 502;
      throw error;
    }

    // 4. If all is good, return the data
    return data;

  } catch (error) {
    // Log the error for Render dashboard
    console.error("Flask Service Error:", error.message);

    // If we manually threw an error with a statusCode, pass it through
    if (error.statusCode) {
      throw error;
    }

    // Otherwise, wrap the Axios/Network error into a 502
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