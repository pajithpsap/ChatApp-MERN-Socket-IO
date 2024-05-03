import express from "express";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const userRouter = express.Router();

userRouter.get("/", protectRoute, getUsersForSidebar);

export default userRouter;
