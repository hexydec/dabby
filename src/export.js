(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(() => factory(global));
	} else if (typeof exports !== "undefined") {
		module.exports = factory(global);
	} else if (!global.$) {
		global.$ = factory(global);
	}
}(this || window, window => {
	"use strict";
