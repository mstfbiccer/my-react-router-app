import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Yalnızca VITE_* olanları yükle (client'a expose edilebilir)
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    base: "./",
    build: { outDir: "dist" }
  };
});
