import { Router, type RequestHandler } from "express";
import { getMessageFromToday } from "../controller/bot.controller.js";

const botRouter: Router = Router()

botRouter.get("get_message_from_today", getMessageFromToday)

export default botRouter