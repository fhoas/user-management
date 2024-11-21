import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorizedddd"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    const userData = await User.findById(user._id)
    const role = userData.role
    user = {
      _id: user._id,
      email: user.email,
      iat: user.iat,
      exp: user.exp,
      role: role
    }
    req.user = user;
    next();
  });
};

export const verifyRole = async (req, res, next) => {
  const role = req.user.role
  if (role === "admin") {
    return next()
  }
  return next(errorHandler(403, "Forbidden"));
};
