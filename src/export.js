(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(function() {
			return factory(global);
		});
	} else if (typeof exports !== "undefined") {
		module.exports = factory(global);
	} else if (!global.$) {
		global.$ = factory(global);
	}
}(this, function (window) {
	"use strict";
