import TelegramBot from "node-telegram-bot-api";
import { Bot } from "../model/bot.model.js";
import "dotenv/config";
Bot.sync({ force: false });
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === "/start") {
        const foundedUser = await Bot.findOne({ where: { chat_id: chatId } });
        if (!foundedUser) {
            bot.sendMessage(chatId, "Iltimos telefon raqamingizni kiriting", {
                reply_markup: {
                    keyboard: [[{ text: "telefon raqam ulashish", request_contact: true }]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        }
    }
});
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    if (msg.contact) {
        console.log("Kontakt olindi:", msg.contact.phone_number);
    }
});
export const getMessageFromToday = async (req, res, next) => {
    try {
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
//# sourceMappingURL=bot.controller.js.map