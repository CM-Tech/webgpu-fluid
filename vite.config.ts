import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin({ hot: false })],
  base: "/webgpu-fluid/",
  build: {
    target: "esnext",
  },
});
