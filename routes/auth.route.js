import express from "express";
import {
  getUsersController,
  loginController,
  refreshController,
  registerController,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/users", authenticate, getUsersController);
router.post("/refresh", verifyRefreshToken, refreshController);

export default router;
