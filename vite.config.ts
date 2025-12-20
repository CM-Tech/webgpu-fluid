import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import viteWesl from "wesl-plugin/vite";
import { staticBuildExtension } from "wesl-plugin";

export default defineConfig({
  plugins: [
    solidPlugin({ hot: false }),
    viteWesl({
      extensions: [staticBuildExtension],
    }),
  ],
  build: {
    target: "esnext",
  },
});
