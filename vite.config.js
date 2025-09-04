import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/inkcredible/", // 👈 GitHub repo name
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
