["filter", "not"].forEach(name => {
	$.fn[name] = function (selector) {
		return $(filterNodes(this, selector, name === "not"));
	};
});
