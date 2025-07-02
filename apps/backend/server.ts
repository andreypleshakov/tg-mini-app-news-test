import express from "express";
import cors from "cors";
import path from "path";
import { getNews } from "./newsStore";
import { Request, Response } from "express";
import "./bot";

const app = express();
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/news", (_, res) => {
  const item = getNews();
  res.json(item);
});

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
