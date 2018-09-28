/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);
	var banner = "/*! <%= pkg.name %> v<%= pkg.version %> by Will Earp - https://github.com/hexydec/dabby */\n";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		/*concat: {
			options: {
				banner: banner,
				sourceMap: true,
				sourceMapStyle: "link"
			},
			es6: {
				files: {
					["dist/dabby.js"]: files.concat("!src/polyfill/*.js", "src/export.js")
				}
			},
			es5: {
				options: {
					footer: "return dabby;}));"
				},
				files: {
					["dist/dabby.es5.js"]: ["src/export.es5.js", "src/polyfill/*.js"].concat(files)
				}
			},
			internalses6: {
				options: {
					banner: "import $ from \"../dist/dabby.js\";\n\n",
					footer: "export {camelise, dasherise, filterNodes, getEvents, getProp, getVal, setCss};"
				},
				files: {*/
					//"tests/internals.js": ["src/internal/**/*.js", "!src/**/test.js"]
				/*}
			},
			testes6: {
				options: {
					banner: "import $ from \"../dist/dabby.js\";\nimport * as internals from \"./internals.js\";\n\n"
				},
				files: {*/
					//"tests/test.js": ["src/test.js", "src/**/test.js"]
				/*}
			},
			testes5: {
				files: {*/
					//"tests/test.es5.js": ["src/test.js", "src/**/test.js"],
					//"tests/internals.es5.js": ["src/internal/**/*.js", "!src/**/test.js"]
				/*}
			}
		},*/
		rollup: {
			options: {
				sourcemap: true,
				banner: banner,
			},
			es6: {
				options: {
					format: "es"
				},
				"dest": "dist/dabby.js",
				"src": "src/build.js"
			},
			es5: {
				options: {
					format: "umd"
				},
				"dest": "dist/dabby.es5.js",
				"src": "src/build.es5.js"
			}
		},
		babel: {
			es6: {
				files: {
					["dist/dabby.min.js"]: "dist/dabby.js",
					//"tests/test.js": "tests/test.js"
				},
				options: {
					sourceMap: false,
					presets: [
						"minify",
					],
					plugins: [
						//["@comandeer/banner", {banner: banner}]
					]
				}
			},
			es5: {
				files: {
					["dist/dabby.es5.js"]: "dist/dabby.es5.js",
					"tests/internals.es5.js": "tests/internals.es5.js",
					"tests/test.es5.js": "tests/test.es5.js"
				},
				options: {
					sourceMap: true,
					presets: [
						["@babel/env", {
							"targets": {
								"browsers": ["last 2 versions", "IE >= 11"]
							},
							"useBuiltIns": false
						}]
					]
				}
			}
		},
		uglify: {
			options: {
				banner: banner,
				report: "gzip"
			},
			minified: {
				files: {
					["dist/dabby.es5.min.js"]: "dist/dabby.es5.js"
				}
			}
		},
		watch: {
			main: {
				files: ["src/**/*.js", "!src/**/test.js", "gruntfile.js", "package.json"],
				tasks: ["rollup", "babel", "uglify"]
			},
			//test: {
			//	files: ["gruntfile.js", "package.json", "src/test.js", "src/**/test.js", "src/internal/**/*.js"],
			//	tasks: ["concat:testes6", "concat:testes5", "concat:internalses6", "babel"]
			//}
		}
	});
	grunt.registerTask("default", ["rollup", "babel", "uglify"]);
};
