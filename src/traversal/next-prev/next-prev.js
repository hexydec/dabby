$.each({
	next: "nextElementSibling",
	prev: "previousElementSibling"
}, function (name, func) {
	$.fn[name] = function (selector) {
		if (this[0]) {
			var sibling = this[0][func];
			if (selector && filterNodes.call(sibling, selector) < 1) {
				return $();
			}
		}
		return $(sibling);
	};
});
