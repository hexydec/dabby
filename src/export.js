if (typeof define === "function" && define.amd) {
	define("dabby", [], function() {
		return dabby;
	});
} else if (!window.$) {
	window.$ = $;
}
