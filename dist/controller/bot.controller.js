import TelegramBot from "node-telegram-bot-api";
import { Bot } from "../model/bot.model.js";
import { BotUser } from "../model/botUser.model.js";
import "dotenv/config";
import { Op } from "sequelize";
await Bot.sync({ force: false });
await BotUser.sync({ force: false });
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const full_name = msg.from?.first_name;
    const foundedUser = await BotUser.findOne({ where: { chat_id: chatId } });
    if (!foundedUser) {
        await BotUser.create({ full_name, chat_id: chatId });
    }
    if (!foundedUser || !foundedUser.phone_number) {
        bot.sendMessage(chatId, "Iltimos telefon raqamingizni kiriting", {
            reply_markup: {
                keyboard: [[{ text: "telefon raqam ulashish", request_contact: true }]],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });
    }
    else {
        bot.sendMessage(chatId, "Siz ro'yxatdan o'tgansiz!");
    }
});
bot.on("contact", async (msg) => {
    const chatId = msg.chat.id;
    const phone = msg.contact?.phone_number;
    await BotUser.update({ phone_number: phone }, { where: { chat_id: chatId } });
    bot.sendMessage(chatId, "Rahmat, telefon raqamingiz saqlandi!");
});
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const full_name = msg.from?.first_name;
    if (text && text !== "/start") {
        try {
            await Bot.create({
                full_name: full_name,
                chat_id: chatId,
                message: text
            });
            console.log("Xabar 'Bots' jadvaliga saqlandi!");
        }
        catch (error) {
            console.error("Bots jadvaliga yozishda xato:", error);
        }
    }
    console.log(msg);
});
export const getMessageFromToday = async (req, res, next) => {
    try {
        const currenDate = new Date();
        currenDate.setUTCHours(0, 0, 0, 0);
        const messages = await Bot.findAll({ where: { createdAt: { [Op.gte]: currenDate } } });
        res.status(200).json(messages);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const getLastTenDays = async (req, res, next) => {
    try {
        const tenDaysAgo = new Date(); // Hozirgi vaqt
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10); // 10 kun orqaga
        // MUHIM QISM: O'sha kunning boshlanish vaqtiga sozlaymiz
        tenDaysAgo.setHours(0, 0, 0, 0);
        console.log("Qidirilayotgan sana:", tenDaysAgo); // Terminalda tekshirib ko'ring
        const messages = await Bot.findAll({
            where: {
                createdAt: {
                    [Op.gte]: tenDaysAgo // tenDaysAgo dan katta yoki teng (ya'ni yangiroq) xabarlar
                }
            },
            order: [['createdAt', 'DESC']] // Oxirgi xabarlar tepada turishi uchun
        });
        return res.status(200).json(messages);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
//# sourceMappingURL=bot.controller.js.map