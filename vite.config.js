import { defineConfig } from "vite";
import { resolve } from "path";

const banner = `/*! dabbyjs v${process.env.npm_package_version} by Will Earp - https://github.com/hexydec/dabby */`;

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/build.js"),
			formats: ["es"],
			fileName: () => "dabby.js",
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
});