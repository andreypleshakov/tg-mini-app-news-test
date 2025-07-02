import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [react()],
  base: isDev ? "/" : "/tg-mini-app-news-test/",
  server: {
    host: true,
    port: 5174,
    ...(isDev && {
      https: {
        key: fs.readFileSync("./.cert/localhost-key.pem"),
        cert: fs.readFileSync("./.cert/localhost.pem"),
      },
    }),
  },
  build: {
    outDir: "dist",
  },
});
