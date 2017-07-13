$.each({
	next: "nextElementSibling",
	prev: "previousElementSibling"
}, function (name, func) {
	$.fn[name] = function (selector) {
		var sibling = null;
		if (this[0]) {
			sibling = this[0][func]();
			if (selector && !sibling.matches(selector)) {
				sibling = null;
			}
		}
		return $(sibling);
	};
});