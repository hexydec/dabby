module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);
	var banner = "/*! <%= pkg.name %> v<%= pkg.version %> by Will Earp - https://github.com/hexydec/dabby */\n";
	var path = require('path');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		rollup: {
			es6: {
				options: {
					format: "es",
					sourcemap: true,
					banner: banner
				},
				src: "src/build.js",
				dest: "dist/dabby.js"
			},
			es5: {
				options: {
					format: "umd",
					sourcemap: true,
					banner: banner,
					name: "$"
				},
				src: "src/build.js",
				dest: "dist/dabby.es5.js"
			},
			test: {
				options: {
					format: "es",
					external: [
						path.resolve(__dirname, "dist/dabby.js")
					]
				},
				src: "src/test.js",
				dest: "tests/test.js"
			},
			testes5: {
				options: {
					format: "iife",
					external: [
						path.resolve(__dirname, "dist/dabby.js")
					],
					globals: {[path.resolve(__dirname, "dist/dabby.js")]: "$"}
				},
				src: "src/test.js",
				dest: "tests/test.es5.js"
			},
			benchmark: {
				options: {
					format: "es",
					external: [
						"dabby",
						"jQuery"
					],
					paths: {
						dabby: "../dist/dabby.js",
						jQuery: "../node_modules/jquery/dist/jquery.js"
					}
				},
				src: "src/benchmark.js",
				dest: "benchmark/suite.js"
			}
		},
		babel: {
			es6: {
				files: {
					"dist/dabby.js": "dist/dabby.js"
				},
				options: {
					sourceMap: true
				}
			},
			es5: {
				files: {
					"dist/dabby.es5.js": "dist/dabby.es5.js",
					"tests/test.es5.js": "tests/test.es5.js"
				},
				options: {
					sourceMap: true,
					presets: [
						["@babel/env", {
							useBuiltIns: false,
							modules: false
						}]
					]
				}
			}
		},
		terser: {
			options: {
				toplevel: true,
				mangle: {
					reserved: ["$"],
				}
			},
			es6: {
				ecma: 2015,
				mangle: {
					module: true
				},
				files: {
					"dist/dabby.min.js": "dist/dabby.js"
				}
			},
			es5: {
				ecma: 5,
				files: {
					"dist/dabby.es5.min.js": "dist/dabby.es5.js"
				}
			}
		},
		watch: {
			main: {
				files: ["src/**/*.js", "!src/**/test.js", "!src/**/benchmark.js", "gruntfile.js", "package.json"],
				tasks: ["rollup:es6"]
			},
			test: {
				files: ["gruntfile.js", "package.json", "src/test.js", "src/**/test.js", "src/internal/**/*.js"],
				tasks: ["rollup:test"]
			},
			benchmark: {
				files: ["gruntfile.js", "package.json", "src/benchmark.js", "src/**/benchmark.js"],
				tasks: ["rollup:benchmark"]
			}
		}
	});
	grunt.registerTask("default", ["rollup", "babel", "terser"]);
};
