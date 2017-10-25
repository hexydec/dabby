/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			main: {
				options: {
					banner: "/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> by Will Earp */\n(function () {\n\"use strict\";\n",
					footer: "}());",
					sourceMap: true,
					sourceMapStyle: "link"
				},
				files: {
					"dist/dabby.js": ["src/utils/**/*.js", "src/dabby.js", "src/core/**/*.js", "src/**/*.js", "src/export.js", "!src/**/test.js"]
					//'documentation.md': ['src/readme.md', 'src/plugins/**/readme.md']
				}
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
			beautified: {
				options: {
					beautify: true,
					compress: false,
					mangle: false
				},
				files: {
					"dist/dabby.js": "dist/dabby.js"
				}
			},
			minified: {
				files: {
					"dist/dabby.min.js": "dist/dabby.js"
				}
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
