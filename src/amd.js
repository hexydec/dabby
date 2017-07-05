define(["main"], function(dabby) {
	"use strict";
	
	if (typeof define === "function" && define.amd) {
		define("jquery", [], function() {
			return dabby;
		});
	}
});