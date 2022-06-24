import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin({ hot: false })],
  base: "/gputhing/",
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
