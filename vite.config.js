import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  root: "src",
  build: {
    outDir: "../docs",
    target: "esnext",
  },
});
