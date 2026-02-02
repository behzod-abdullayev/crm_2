import { Router } from "express";
import { getLastTenDays, getMessageFromToday } from "../controller/bot.controller.js";
const botRouter = Router();
botRouter.get("/get_message_from_today", getMessageFromToday);
botRouter.get("/get_messages_last_ten_days", getLastTenDays);
export default botRouter;
//# sourceMappingURL=bot.routes.js.map