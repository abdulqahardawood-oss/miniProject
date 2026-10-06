import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../data/data.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { AppError } from "../utils/AppError.js";

export const registerUser = async (data) => {
  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = { name, email, password: hashedPassword };
  users.push({
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

export const getUsers = () => {
  return users;
};

export const loginUser = async (data) => {
  const checkUser = users.find((user) => {
    return user.email == data.email;
  });

  if (!checkUser) {
    throw new AppError("Invalid Email or Password", 400);
  }
  const comparePassword = await bcrypt.compare(
    data.password,
    checkUser.password,
  );

  if (!comparePassword) {
    throw new AppError("Invalid Email or Password", 400);
  }

  // const accessToken = await jwt.sign(
  //   { email: checkUser.email },
  //   "testingaDevTeam",
  //   { expiresIn: "5m" },
  // );

  const accessToken = await generateAccessToken(checkUser);
  const refreshToken = await generateRefreshToken(checkUser);

  return {
    id: checkUser.id,
    email: checkUser.email,
    accessToken,
    refreshToken,
  };
};
