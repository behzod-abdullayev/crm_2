import type { NextFunction, Request, Response } from "express";
import TelegramBot from "node-telegram-bot-api";
import { Bot } from "../model/bot.model.js";
import { BotUser } from "../model/botUser.model.js";
import "dotenv/config";

await Bot.sync({ force: false });
await BotUser.sync({ force: false });

const bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const full_name = msg.from?.first_name as string;

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
  } else {
    bot.sendMessage(chatId, "Siz ro'yxatdan o'tgansiz!");
  }
});

bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phone = msg.contact?.phone_number;

  await BotUser.update(
    { phone_number: phone },
    { where: { chat_id: chatId } }
  );

  bot.sendMessage(chatId, "Rahmat, telefon raqamingiz saqlandi!");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const full_name = msg.from?.first_name as string;

  if (text && text !== "/start") {
    try {
      await Bot.create({
        full_name: full_name,
        chat_id: chatId,
        message: text
      });
      console.log("Xabar 'Bots' jadvaliga saqlandi!");
    } catch (error) {
      console.error("Bots jadvaliga yozishda xato:", error);
    }
  }
  
  console.log(msg);
});

export const getMessageFromToday = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};