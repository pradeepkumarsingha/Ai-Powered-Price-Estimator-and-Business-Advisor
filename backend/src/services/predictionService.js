import Prediction from "../models/Prediction.js";
import { requestFlaskPrediction } from "./flaskService.js";
import { furnishingOptions, supportedLocations } from "../constants/propertyOptions.js";

const requiredFields = ["area_sqft", "bhk", "bathrooms", "parking", "location", "furnishing"];

const validatePayload = (payload) => {
  for (const field of requiredFields) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateNormalizedPayload = (payload) => {
  if (!Number.isFinite(payload.area_sqft) || payload.area_sqft <= 0) {
    const error = new Error("area_sqft must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(payload.bhk) || payload.bhk <= 0) {
    const error = new Error("bhk must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(payload.bathrooms) || payload.bathrooms <= 0) {
    const error = new Error("bathrooms must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(payload.parking) || payload.parking < 0) {
    const error = new Error("parking must be zero or a positive number");
    error.statusCode = 400;
    throw error;
  }

  if (!supportedLocations.includes(payload.location)) {
    const error = new Error(
      `Unsupported location \"${payload.location}\". Supported locations: ${supportedLocations.join(", ")}`
    );
    error.statusCode = 400;
    throw error;
  }

  if (!furnishingOptions.includes(payload.furnishing)) {
    const error = new Error(
      `Unsupported furnishing \"${payload.furnishing}\". Supported furnishing types: ${furnishingOptions.join(", ")}`
    );
    error.statusCode = 400;
    throw error;
  }
};

export const createPrediction = async (payload, userId) => {
  validatePayload(payload);

  const normalizedPayload = {
    area_sqft: Number(payload.area_sqft),
    bhk: Number(payload.bhk),
    bathrooms: Number(payload.bathrooms),
    parking: Number(payload.parking),
    location: String(payload.location).trim(),
    furnishing: String(payload.furnishing).trim()
  };

  validateNormalizedPayload(normalizedPayload);

  const flaskResult = await requestFlaskPrediction(normalizedPayload);

  const prediction = await Prediction.create({
    user: userId,
    ...normalizedPayload,
    predicted_price: flaskResult.predicted_price,
    price_range: flaskResult.price_range,
    recommendation: flaskResult.recommendation
  });

  return prediction;
};
