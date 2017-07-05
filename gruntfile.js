/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		requirejs: {
			options: {
				skipModuleInsertion: true,
				findNestedDependencies: true,
				optimize: "none",
				include: ["amd"],
				baseUrl: "src/",
				//wrap: true,
				preserveLicenseComments: false,
				onModuleBundleComplete: function (data) {
					require("fs").writeFileSync(
						data.path,
						require("amdclean").clean({
							filePath: data.path,
							transformAMDChecks: false/*,
							wrap: false,
							sourceMap: grunt.file.readJSON(data.path + ".map"),
							esprima: {source: data.path},
							escodegen: {sourceMap: true, sourceMapWithCode: false}*/
						})
					);
				}
			},
			dev: {
				options: {
					generateSourceMaps: true,
					out: "dist/dabby.js"
				}
			},
			live: {
				options: {
					optimize: "uglify2",
					out: "dist/dabby.min.js"
				}
			}
		},
		watch: {
			js: {
				files: ["src/**/*.js", "gruntfile.js", "package.json"],
				tasks: ["requirejs"]
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("default", ["requirejs"]);
};
