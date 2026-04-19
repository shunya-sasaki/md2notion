import licensePlugin from "esbuild-plugin-license";
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
  esbuildPlugins: [
    licensePlugin({
      thirdParty: {
        output: {
          file: "../NOTICE",
          template(dependencies) {
            return dependencies
              .map((dep) => {
                const name = `${dep.packageJson.name}@${dep.packageJson.version}`;
                const license = dep.packageJson.license || "Unknown";
                const text = dep.licenseText || "No license text provided.";
                const title = `${name} (${license})`;
                const titleLength = title.length;
                const separator = "=".repeat(titleLength + 2);

                return `${separator}\n ${title}\n${separator}\n\n${text}\n\n`;
              })
              .join("\n");
          },
        },
        includePrivate: false,
      },
    }),
  ],
});
