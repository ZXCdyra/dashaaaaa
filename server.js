const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const APP_URL = process.env.APP_URL || process.env.PUBLIC_URL || process.env.WEBAPP_URL || `http://localhost:${PORT}`;

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/telegram-config", (_req, res) => {
  res.json({
    appUrl: APP_URL,
    botEnabled: Boolean(process.env.BOT_TOKEN),
    botName: process.env.BOT_USERNAME || "DashaLoveBot",
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (process.env.BOT_TOKEN) {
  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(
      chatId,
      "Привет! Я подготовил для тебя нежное письмо для Даши ✨\nНажми кнопку ниже, чтобы открыть сайт внутри Telegram.",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Открыть письмо",
                web_app: { url: APP_URL },
              },
            ],
          ],
        },
      }
    );
  });

  bot.on("polling_error", (error) => {
    console.error("Telegram polling_error:", error.message || error);
  });

  console.log("Telegram bot is running and ready to open the site in WebApp.");
}

app.listen(PORT, HOST, () => {
  console.log(`Сайт запущен на http://localhost:${PORT}`);
  console.log(`Telegram WebApp URL: ${APP_URL}`);
  console.log(`Доступно с телефона: http://<IP_вашего_компьютера>:${PORT}`);
});
