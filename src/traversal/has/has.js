$.fn.has = function (selector) {
	return $([].filter.call(this, function (node) {
		return node.querySelectorAll(selector).length > 0;
	}));
};