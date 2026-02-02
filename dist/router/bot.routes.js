import { Router } from "express";
import { getMessageFromToday } from "../controller/bot.controller.js";
const botRouter = Router();
botRouter.get("get_message_from_today", getMessageFromToday);
export default botRouter;
//# sourceMappingURL=bot.routes.js.map