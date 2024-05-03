import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const msgRouter = express.Router();
msgRouter.get("/:id", protectRoute, getMessages);
msgRouter.post("/send/:id", protectRoute, sendMessage);

export default msgRouter;