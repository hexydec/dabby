/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);

	// build files using include or exclude arguments
	var files = ["src/export.js", "src/internal/**/*.js", "src/dabby.js", "src/utils/each/each.js"],
		outdir = grunt.option("outdir") || "dist",
		outfile = outdir + "/dabby.js",
		concat = {},
		outfilemin = {},
		outfilemines5 = {},
		outfilees5 = {
			"tests/internals.es5.js": "tests/internals.js"
		};

	if (grunt.option("include")) {
		files.push("src/*/**/{"+grunt.option("include")+"}.js");
	} else {
		files.push("src/*/**/"+(grunt.option("exclude") ? "!(" + grunt.option("exclude").replace(",", "|") + ")" : "*")+".js");
	}
	files.push("!src/**/test.js");
	files.push("!src/polyfill/*.js");

	outfilemin[outdir + "/dabby.min.js"] = outfile;
	concat[outfile] = Object.assign([], files);
	files.pop();
	files.unshift("src/polyfill/*.js");
	concat[outdir + "/dabby.es5.js"] = files;
	outfilees5[outdir + "/dabby.es5.js"] = outdir + "/dabby.es5.js";
	outfilemines5[outdir + "/dabby.es5.min.js"] = outdir + "/dabby.es5.js";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			main: {
				options: {
					banner: "/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> by Will Earp */\n\n",
					footer: "return dabby;}));",
					//sourceMap: true,
					//sourceMapStyle: "link",
					process: function(src, filepath) {
						if (filepath !== "src/export.js") {
							src = "\t" + src.replace(/\n/g, "\n\t");
						}
						return src;
					}
				},
				files: concat
			},
			test: {
				files: {
					"tests/test.js": ["src/test.js", "src/**/test.js"],
					"tests/internals.js": ["src/internal/**/*.js", "!src/**/test.js"]
				}
			}
		},
		babel: {
			es6: {
				files: outfilemin,
				options: {
					sourceMap: false,
					presets: ["minify"]
				}
			},
			es5: {
				files: outfilees5,
				options: {
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
				banner: "/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> by Will Earp *\/",
				report: "gzip"
			},
			minified: {
				files: outfilemines5
			}
		},
		watch: {
			main: {
				files: ["src/**/*.js", "!src/**/test.js", "gruntfile.js", "package.json"],
				tasks: ["concat:main", "babel", "uglify"]
			},
			test: {
				files: ["gruntfile.js", "package.json", "src/test.js", "src/**/test.js", "src/internal/**/*.js"],
				tasks: ["concat:test"]
			}
		}
	});
	grunt.registerTask("default", ["concat", "babel", "uglify"]);
};
