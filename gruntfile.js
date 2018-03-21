/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);

	// build files using include or exclude arguments
	var files = ["src/internal/**/*.js", "src/dabby.js", "src/utils/each/each.js"],
		outdir = grunt.option("outdir") || "dist";

	if (grunt.option("include")) {
		files.push("src/*/**/{"+grunt.option("include")+"}.js");
	} else {
		files.push("src/*/**/"+(grunt.option("exclude") ? "!(" + grunt.option("exclude").replace(",", "|") + ")" : "*")+".js");
	}
	files.push("!src/**/test.js");

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			options: {
				banner: "/*! <%= pkg.name %> v<%= pkg.version %> by Will Earp - https://github.com/hexydec/dabby */\n\n",
				sourceMap: true,
				sourceMapStyle: "link",
				/*process: function(src, filepath) {
					if (filepath !== "src/export.js") {
						src = "\t" + src.replace(/\n/g, "\n\t");
					}
					return src;
				}*/
			},
			es6: {
				files: {
					[outdir + "/dabby.js"]: files.concat("!src/polyfill/*.js", "src/export.js")
				}
			},
			es5: {
				options: {
					footer: "return dabby;}));"
				},
				files: {
					[outdir + "/dabby.es5.js"]: ["src/export.es5.js", "src/polyfill/*.js"].concat(files)
				}
			},
			internalses6: {
				options: {
					banner: "import $ from \"../dist/dabby.js\";\n\n",
					footer: "export {camelise, dasherise, filterNodes, getEvents, getProp, getVal, setCss};"
				},
				files: {
					"tests/internals.js": ["src/internal/**/*.js", "!src/**/test.js"]
				}
			},
			testes6: {
				options: {
					banner: "import $ from \"../dist/dabby.js\";\nimport * as internals from \"./internals.js\";\n\n"
				},
				files: {
					"tests/test.js": ["src/test.js", "src/**/test.js"]
				}
			},
			testes5: {
				files: {
					"tests/test.es5.js": ["src/test.js", "src/**/test.js"],
					"tests/internals.es5.js": ["src/internal/**/*.js", "!src/**/test.js"]
				}
			}
		},
		babel: {
			es6: {
				files: {
					[outdir + "/dabby.min.js"]: outdir + "/dabby.js",
					//"tests/test.js": "tests/test.js"
				},
				options: {
					sourceMap: false,
					presets: ["minify"]
				}
			},
			es5: {
				files: {
					[outdir + "/dabby.es5.js"]: outdir + "/dabby.es5.js",
					"tests/internals.es5.js": "tests/internals.es5.js",
					"tests/test.es5.js": "tests/test.es5.js"
				},
				options: {
					sourceMap: true,
					presets: [
						["env", {
							"targets": {
								"browsers": ["last 2 versions", "IE >= 11"]
							},
							"useBuiltIns": true
						}]
					]
				}
			}
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> v<%= pkg.version %> by Will Earp - https://github.com/hexydec/dabby *\/",
				report: "gzip"
			},
			minified: {
				files: {
					[outdir + "/dabby.es5.min.js"]: outdir + "/dabby.es5.js"
				}
			}
		},
		watch: {
			main: {
				files: ["src/**/*.js", "!src/**/test.js", "gruntfile.js", "package.json"],
				tasks: ["concat:es6", "concat:es5", "babel", "uglify"]
			},
			test: {
				files: ["gruntfile.js", "package.json", "src/test.js", "src/**/test.js", "src/internal/**/*.js"],
				tasks: ["concat:testes6", "concat:testes5", "concat:internalses6", "babel"]
			}
		}
	});
	grunt.registerTask("default", ["concat", "babel", "uglify"]);
};
