["filter", "not"].forEach(function (name) {
	$.fn[name] = function (selector) {
		return $(filterNodes.call(this, selector, name === "not"));
	};
});
