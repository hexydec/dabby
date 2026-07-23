import { defineConfig } from "vite";
import { resolve } from "path";
import { existsSync } from "fs";

const banner = `/*! dabbyjs v${process.env.npm_package_version} by Will Earp - https://github.com/hexydec/dabby */`;

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/build.ts"),
			formats: ["es"],
			fileName: () => "full.js",
		},
		outDir: "dist",
		emptyOutDir: false,
		sourcemap: true,
		minify: "terser",
		terserOptions: {
			toplevel: true,
			mangle: {
				reserved: ["$"],
				module: true,
			},
		},
		rollupOptions: {
			output: {
				banner,
			},
		},
	},
	plugins: [
		{
			name: "prefer-ts-over-js",
			enforce: "pre",
			resolveId(source, importer) {
				if (source.endsWith(".js") && importer) {
					const normalizedImporter = importer.replace(/\\/g, "/");
					if (normalizedImporter.includes("/src/")) {
						const dir = normalizedImporter.substring(0, normalizedImporter.lastIndexOf("/"));
						const tsPath = resolve(dir, source.replace(/\.js$/, ".ts")).replace(/\\/g, "/");
						if (existsSync(tsPath)) {
							return tsPath;
						}
					}
				}
				return null;
			},
		},
	],
});
