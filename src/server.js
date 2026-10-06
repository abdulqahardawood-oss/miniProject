import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "../routes/auth.route.js";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
