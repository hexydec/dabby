import { defineConfig } from "vitest/config";
import { resolve } from "path";
import { existsSync } from "fs";

export default defineConfig({
	test: {
		environment: "happy-dom",
		include: ["src/**/test.ts"],
		globals: true,
	},
	resolve: {
		alias: {
			"dabbyjs": resolve(__dirname, "src/dabby.ts"),
		},
		extensions: [".ts", ".js", ".mjs", ".json"],
	},
	plugins: [
		{
			name: "resolve-js-to-ts",
			enforce: "pre",
			resolveId(source, importer) {
				// Only handle .js imports from within src/
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
