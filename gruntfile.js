/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {

	// build files using include or exclude arguments
	var files = ["src/export.js", "src/utils/**/*.js", "src/dabby.js"],
		outdir = grunt.option("outdir") || "dist",
		outfile = {},
		outfilemin = {};

	if (grunt.option("include")) {
		files.push("src/*/**/{"+grunt.option("include")+"}.js");
	} else {
		files.push("src/*/**/"+(grunt.option("exclude") ? "!(" + grunt.option("exclude").replace(",", "|") + ")" : "*")+".js");
	}
	files.push("!src/**/test.js");

	outfile[outdir + "/dabby.js"] = files;
	outfilemin[outdir + "/dabby.min.js"] = outdir + "/dabby.js"

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
				files: outfile
			},
			test: {
				files: {
					"tests/test.js": ["src/test.js", "src/**/test.js"],
					"tests/internals.js": ["src/utils/**/*.js", "!src/**/test.js"]
				}
			}
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> by Will Earp */",
				report: "gzip"
			},
			minified: {
				files: outfilemin
			}
		},
		watch: {
			js: {
				files: ["src/**/*.js", "gruntfile.js", "package.json"],
				tasks: ["concat", "uglify"]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("default", ["concat", "uglify"]);
};
