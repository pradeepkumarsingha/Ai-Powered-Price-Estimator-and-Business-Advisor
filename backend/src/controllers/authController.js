import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const googleClient = new OAuth2Client(env.googleClientId || undefined);

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  authProvider: user.authProvider,
  createdAt: user.createdAt
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("name, email, and password are required");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters long");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      const error = new Error("An account with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      authProvider: "local"
    });

    res.status(201).json({
      success: true,
      data: {
        user: sanitizeUser(user),
        token: generateToken(user._id.toString())
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !user.password) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    res.json({
      success: true,
      data: {
        user: sanitizeUser(user),
        token: generateToken(user._id.toString())
      }
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!env.googleClientId) {
      const error = new Error("Google authentication is not configured on the server");
      error.statusCode = 500;
      throw error;
    }

    if (!credential) {
      const error = new Error("Google credential is required");
      error.statusCode = 400;
      throw error;
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.googleClientId
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      const error = new Error("Unable to verify Google account email");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = payload.email.toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = await User.create({
        name: payload.name || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        password: null,
        authProvider: "google",
        googleId: payload.sub,
        avatar: payload.picture || ""
      });
    } else {
      user.name = payload.name || user.name;
      user.googleId = payload.sub;
      user.avatar = payload.picture || user.avatar;
      if (user.authProvider !== "google") {
        user.authProvider = "google";
      }
      await user.save();
    }

    res.json({
      success: true,
      data: {
        user: sanitizeUser(user),
        token: generateToken(user._id.toString())
      }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
      error.message = "Google authentication failed";
    }
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};
