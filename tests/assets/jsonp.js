(function (win) {
	"use strict";

	document
		.querySelector("script[src*='jsonp.js']")
		.src
		.split("?")[1]
		.split("&")
		.forEach(function (item) {
			var tmp = item.split("=");
			if (decodeURIComponent(tmp[0]) === "callback") {
				win[decodeURIComponent(tmp[1])] = function () {
					return true;
				};
				return false;
			}
		});
}(window));
