import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/InkCredible/", // 👈 GitHub repo name
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
