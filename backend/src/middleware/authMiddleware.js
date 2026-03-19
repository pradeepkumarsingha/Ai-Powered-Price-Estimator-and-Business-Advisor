import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import User from "../models/User.js";

export const protect = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      const error = new Error("Not authorized. Please sign in.");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.userId).select("-password").lean();

    if (!user) {
      const error = new Error("User not found for this token.");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
      error.message = "Session expired or invalid. Please sign in again.";
    }
    next(error);
  }
};
