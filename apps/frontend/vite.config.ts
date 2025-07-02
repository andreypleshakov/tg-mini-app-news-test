import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "tg-mini-app.local",
    port: 5174,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, ".cert/localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, ".cert/localhost.pem")),
    },
  },
  build: {
    outDir: "dist",
  },
});
