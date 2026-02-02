import { Router, type RequestHandler } from "express";
import { getLastTenDays, getMessageFromToday } from "../controller/bot.controller.js";

const botRouter: Router = Router();

botRouter.get("/get_message_from_today", getMessageFromToday as RequestHandler);
botRouter.get("/get_messages_last_ten_days", getLastTenDays as RequestHandler);

export default botRouter;