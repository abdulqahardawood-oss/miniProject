import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const verifyRefreshToken = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    console.log("Refesh", token);

    if (!token) {
      return next(new AppError("Refresh token is required", 401));
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Refresh token has expired", 401));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid refresh token", 401));
    }

    next(error);
  }
};
