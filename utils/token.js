import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = async (user) => {
  const accessToken = await jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1m" },
  );
  return accessToken;
};

export const generateRefreshToken = async (user) => {
  const accessToken = await jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "7d" },
  );
  return accessToken;
};
