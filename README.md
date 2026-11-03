# Сайт для Даши

Романтический сайт на Node.js + Express, который можно открыть как обычную страницу и как Telegram Web App из бота.

## Локальный запуск

```bash
npm install
npm start
```

Сайт будет доступен по адресу: http://localhost:3000

Чтобы открыть его с телефона, подключите телефон к той же Wi‑Fi, что и компьютер, и откройте:

```text
http://<IP_адрес_компьютера>:3000
```

Например: http://192.168.1.25:3000

## Telegram mini app

Чтобы запустить бот и открывать сайт внутри Telegram, создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Затем заполните:

```env
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
APP_URL=https://your-public-url.com
```

После этого бот будет отвечать на `/start` кнопкой “Открыть письмо”, которая ведёт в Web App.

## Деплой на Render

1. Зайдите в Render.
2. Создайте новый Web Service.
3. Подключите этот репозиторий.
4. Используйте команды:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Нажмите Deploy.

Или загрузите файл `render.yaml` в проект и Render автоматически создаст сервис.
