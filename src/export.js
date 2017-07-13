if (typeof define === "function" && define.amd) {
	define("jquery", [], function() {
		return dabby;
	});
} else if (!window.$) {
	window.$ = $;
}