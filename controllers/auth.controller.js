import { loginSchema } from "../schema/loginSchema.js";
import { registerSchema } from "../schema/registerSchema.js";
import { getUsers, loginUser, registerUser } from "../services/auth.service.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const registerController = async (req, res, next) => {
  const data = registerSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      message: "Validation failed",
      error: data.error.issues,
    });
  }
  const result = await registerUser(data.data);
  res.status(201).json({
    message: "user successfully created",
    data: result,
  });
};

export const getUsersController = (req, res) => {
  console.log(req.headers.authorization);
  const users = getUsers();
  res.status(200).json({
    message: "success",
    data: users,
  });
};

export const loginController = async (req, res) => {
  const data = loginSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({
      message: "Validation failed",
      error: data.error.issues,
    });
  }

  const user = await loginUser(data.data);

  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Succesfully registered",
    user,
  });
};

export const refreshController = async (req, res) => {
  const accessToken = await generateAccessToken(req.user);
  const refreshToken = await generateRefreshToken(req.user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};
