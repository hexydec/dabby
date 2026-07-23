import { defineConfig } from "vite";
import { resolve } from "path";
import { existsSync } from "fs";

export default defineConfig({
	root: __dirname,
	server: {
		port: 5173,
		open: false,
	},
	plugins: [
		{
			name: "prefer-ts-over-js",
			enforce: "pre",
			resolveId(source, importer) {
				if (source.endsWith(".js") && importer) {
					const normalizedImporter = importer.replace(/\\/g, "/");
					if (normalizedImporter.includes("/src/") || normalizedImporter.includes("/demo/")) {
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
