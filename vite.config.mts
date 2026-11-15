import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import viteWesl from "wesl-plugin/vite";
import { staticBuildExtension } from "wesl-plugin";
import { reflectExtension } from "./wesl-reflect";

export default defineConfig({
  plugins: [
    solidPlugin({ hot: false }),
    viteWesl({
      extensions: [staticBuildExtension, reflectExtension],
    }),
  ],
  build: {
    target: "esnext",
  },
});
