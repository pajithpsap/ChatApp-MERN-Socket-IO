import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import msgRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRouter.js";

import connectToMongoDb from "./db/connectToMongoDB.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with json payloads
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/msg", msgRouter);
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`App is running on port ${PORT}`);
});

