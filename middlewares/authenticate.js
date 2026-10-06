import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "../data/data.js";
import { AppError } from "../utils/AppError.js";
dotenv.config();

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Authentication required", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorizarion header",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = users.find((user) => {
      return user.id === decoded.id;
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token has expired", 401));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }
    next(error);
  }
};
