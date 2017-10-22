$.each({
	next: "nextElementSibling",
	prev: "previousElementSibling"
}, function (name, func) {
	$.fn[name] = function (selector) {
		var sibling;
		if (this[0]) {
			sibling = this[0][func]();
			if (selector && filterNodes.call(this, selector) < 1) {
				return $();
			}
		}
		return $(sibling);
	};
});
