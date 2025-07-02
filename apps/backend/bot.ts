import { Telegraf } from "telegraf";
import axios from "axios";
import fs from "fs";
import path from "path";
import { message } from "telegraf/filters";
import { addNews } from "./newsStore";
import "dotenv/config";

const BOT_TOKEN = process.env.BOT_TOKEN!;
const bot = new Telegraf(BOT_TOKEN);

const imageDir = path.join(__dirname, "..", "backend", "images");
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

bot.on(message("photo"), async (ctx) => {
  const photoSizes = ctx.message.photo;
  const caption = ctx.message.caption || "";
  const userId = ctx.from.id;

  const photo = photoSizes.at(-1);
  if (!photo) return;

  try {
    const file = await ctx.telegram.getFile(photo.file_id);
    const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;

    const fileName = `${photo.file_unique_id}.jpg`;
    const localPath = path.join(imageDir, fileName);

    const writer = fs.createWriteStream(localPath);
    const response = await axios.get(fileUrl, { responseType: "stream" });
    response.data.pipe(writer);

    writer.on("finish", () => {
      addNews({
        id: fileName,
        caption,
        imagePath: `/images/${fileName}`,
        userId,
        createdAt: new Date().toISOString(),
      });

      console.log(`✅ Saved image: ${fileName}`);
    });
  } catch (err) {
    console.error("❌ Error saving image:", err);
  }
});

bot.launch();
console.log("🤖 Telegram bot is running...");
