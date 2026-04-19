import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli/md2notion.ts"],
  format: ["esm"],
  outDir: "dist",
  target: "es2022",
  splitting: false,
  clean: true,
  noExternal: [/.*/],
  dts: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
  esbuildOptions(options) {
    options.alias = {
      "@": "./src",
    };
  },
});
